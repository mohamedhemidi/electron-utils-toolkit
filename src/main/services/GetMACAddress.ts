import os from 'os'

/*
/*
/ Get MAC Address from current machine and from ENV file
/*
/** */
export const Get_MAC_ADDRESS = async (): Promise<string | null> => {
  let MacAddresse = ''
  const interfaces = os.networkInterfaces()
  if (process.platform === 'darwin') {
    const ethernetInterfaceNames = ['eth', 'en', 'Ethernet']
    for (const interfaceName in interfaces) {
      const networkInterface = interfaces[interfaceName]
      if (networkInterface) {
        for (const net of networkInterface) {
          if (net.family === 'IPv4' && !net.internal) {
            if (ethernetInterfaceNames.some((prefix) => interfaceName.startsWith(prefix))) {
              MacAddresse = net.mac
            }
          }
        }
      }
    }
    return MacAddresse
  }
  if (process.platform === 'win32') {
    let macAddress: string | null = null

    for (const interfaceName in interfaces) {
      const iface = interfaces[interfaceName]
      if (iface) {
        for (const alias of iface) {
          if (alias.family === 'IPv4' && !alias.internal) {
            macAddress = alias.mac
            break
          }
        }
      }
      if (macAddress) {
        MacAddresse = macAddress
        break
      }
    }

    return MacAddresse
  }
  return null
}
