import { useState } from 'react'

function App(): JSX.Element {
  const api = window.api

  const [macAddress, setMacAddress] = useState<string>('')
  const [licenseKey, setLicenseKey] = useState<string>('')

  const handleGenerateData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    e.preventDefault()
    if (api) {
      // Get MAC Address
      api.send('generate:mac:address:request')
      api.receive('generate:mac:address:response', (data) => {
        console.log(data)
        setMacAddress(data)
      })
      // Get License Key
      api.send('generate:license:key:request')
      api.receive('generate:license:key:response', (data) => {
        console.log(data)
        setLicenseKey(data)
      })
    }
  }

  return (
    <>
      <form className="p-8 flex flex-col gap-4">
        <label className="text-white">MAC Address</label>
        <input
          className="p-2 rounded-md"
          readOnly
          type="text"
          name="mac_address"
          value={macAddress}
        />
        <label className="text-white">Licence Key</label>
        <textarea className="p-2 rounded-md" readOnly name="licence_key" value={licenseKey} />
        <button
          className="bg-slate-300 rounded-md p-2 mt-12"
          onClick={(e) => handleGenerateData(e)}
        >
          Generate
        </button>
      </form>
    </>
  )
}

export default App
