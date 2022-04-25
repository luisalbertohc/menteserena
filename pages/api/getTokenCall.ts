import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { RtcTokenBuilder, RtcRole } from 'agora-access-token';

import config from '@config';

const appID = process.env.NEXT_PUBLIC_AGORA_ID;
const appCertificate = process.env.AGORA_CERTIFICATE;
const role = RtcRole.PUBLISHER;

// Equivalent as 1.15 days
const expirationTimeInSeconds = 100000;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { channelName, uid, userToken } = req.body;

  try {
    // Check if userToken is valid and if it belongs to chat_id
    await axios.post(
      `${config.MENTE_SERENA_API_BASE_URL}/api/user/verify_call`,
      { chat_id: channelName },
      {
        headers: {
          authorization: `bearer ${userToken}`,
        },
      }
    );
  } catch (error) {
    res.status(401).end();
    return;
  }

  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpiredTs);

  res.status(200).json({
    token,
  });
};
