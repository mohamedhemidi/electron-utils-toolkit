import crypto from 'crypto'
/*
/*
/ Generate a License key using the user's MAC address and a private secret key
/*
/** */

export const GenerateLicenseKey = (macAddress, secretKey): string => {
  const hash = crypto.createHmac('sha256', secretKey).update(macAddress).digest('hex')
  return hash
}
