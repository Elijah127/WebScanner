import { useEffect, useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { generateMembers, getMembers } from "./utils/invites";
import toast, { Toaster } from 'react-hot-toast';
import wedScannerlogo from "./assets/logo.png";

function App() {
  const [data, setData] = useState(false);
  const [members, setMembers] = useState([]);


  function scanBarcode(err, result) {
    console.log("Scanning");
    generateMembers();

    if (!result) return setData("No Member");

    const scannedValue = result.text;
    setData(scannedValue);

    const data = JSON.parse(localStorage.getItem(scannedValue));
    const Status = data?.status;
    console.log(Status)
    if (Status === undefined) {
      toast.error(`${scannedValue} not invited`);
    }

    if (Status === true) {
      toast.error(`ERROR: ${scannedValue}, Access has already been granted for this user.`)
    }

    if (Status === false) {
      localStorage.setItem(scannedValue, JSON.stringify({ ...data, status: true, time: new Date().toLocaleString() }));
      toast.success(`Welcome: ${scannedValue}, Your Access has been granted.`)
    }
    setMembers(getMembers());
  }



  useEffect(() => {
    setMembers(getMembers());
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />



      <nav className="shadow-sm bg-neutral-secondary-soft w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={wedScannerlogo} className="h-12 w-12 m-0" alt="Flowbite Logo" />
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">WedScanner</span>
          </a>

        </div>
      </nav>

      <div className="mt-[50px] mb-10 grid grid-cols-1 lg:grid-cols-2 mx-0 sm:mx-10 py-10 bg-[#f8f8f8] rounded">

        <div className="flex flex-col items-center lg:items-end justify-center ">

          <div className="shadow-sm px-5 pt-5 pb-2">
            {/* <h1 className="my-2 text-3xl text-center text-gray-800">Wed invite</h1> */}
            <BarcodeScanner style={{ borderRadius: "10px" }} width={400} height={400} onUpdate={scanBarcode} facingMode="environment" delay={4000} />


            <button type="button" className="my-2 flex mx-auto text-white bg-blue-700 box-border border border-transparent  shadow-xs font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none">Current Member: {data}</button>
          </div>

        </div>

        <div className="items-center lg:items-start mx-5 h-[400px] relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default my-5 md:mx-auto max-w-xl">
          <table class="w-full text-sm text-left rtl:text-right text-body">
            <thead class="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
              <tr>
                <th scope="col" className="px-6 py-3 font-medium">
                  Member
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  <div class="flex items-center">
                    Status
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 font-medium">
                  <div class="flex items-center">
                    Time
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((item) => (
                <tr key={item.memberText} class="bg-neutral-primary-soft border-b  border-default">
                  <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                    {item.memberText}
                  </th>
                  <td className="px-6 py-4">
                    <div className="relative inline-flex">
                      {item.status ?
                        <button className="rounded-md bg-green-800 py-2 px-4 border border-transparent text-center text-xs text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700" type="button">
                          Approved
                        </button>
                        :
                        <button className="rounded-md bg-orange-800 py-2 px-4 border border-transparent text-center text-xs text-white transition-all shadow-md hover:shadow-lg focus:bg-orange-700 focus:shadow-none active:bg-orange-700 hover:bg-orange-700" type="button">
                          Pending
                        </button>
                      }

                    </div>

                  </td>
                  <td className="px-6 py-4">
                    <div class="relative inline-flex whitespace-nowrap">
                      {item.time || "None"}
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>



    </>
  )
}

export default App
