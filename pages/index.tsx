import {
  ConnectWallet,
  useAddress,
  useDisconnect,
  useConnectionStatus,
} from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { NextPage } from "next";
import AddBlog from "../components/AddBlog";
import BlogList from "../components/BlogList";
import { useState } from "react";
const Home: NextPage = () => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connectionStatus = useConnectionStatus();

  const [isAllBlogs, setIsAllBlogs] = useState(false);
  return (
    <div
      className={
        "flex flex-col justify-start items-center min-h-screen bg-[#141A29]"
      }
    >
      <nav className="w-11/12">
        <div className="mx-auto  px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16  items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <div className="flex flex-col justify-center ">
                  <h1 className={"font-dmsans text-2xl "}>DeBlog</h1>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                  <a
                    className={
                      " text-white hover:bg-gray-600 rounded-md px-3 py-2 text-sm font-medium cursor-pointer " +
                      (isAllBlogs ? "bg-blue-400" : "")
                    }
                    aria-current="page"
                    onClick={() => setIsAllBlogs(true)}
                  >
                    All Blogs
                  </a>
                  <a
                    className={
                      " text-white hover:bg-gray-600 rounded-md px-3 py-2 text-sm font-medium cursor-pointer " +
                      (isAllBlogs ? "" : "bg-blue-400")
                    }
                    aria-current="page"
                    onClick={() => setIsAllBlogs(false)}
                  >
                    My Blogs
                  </a>
                </div>
              </div>
            </div>
            <div className="absolute inset-y-0 text-[12px] right-0 flex flex-col items-end pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <ConnectWallet
                auth={{
                  onLogin(token) {
                    console.log("user logged in", token);
                    window.location.reload();
                  },
                  onLogout() {
                    console.log("user logged out");
                  },
                }}
              />

              {/* {address && (
                <div>
                  {" "}
                  {address}
                  <button
                    className={
                      "bg-red-500 text-white   cursor-pointer  p-1 px-2 h-8 rounded-[5px] "
                    }
                    onClick={disconnect}
                  >
                    Disconnect
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </nav>

      <div
        className={
          "flex flex-col justify-center items-center w-10/12 mt-2 p-4 rounded-[10px] border-b-[#555] border-b-[1px] border-solid"
        }
      >
        <div className={"w-full mb-3"}>
          <div className="flex flex-col justify-center ">
            {!address && (
              <h1 className={"font-dmsans text-3xl "}>
                Connect wallet to manage your Blogs
              </h1>
            )}
            {address && (
              <div
                className={
                  "flex flex-row justify-between items-between w-full mt-4"
                }
              >
                <h1 className={"font-dmsans text-3xl "}>Latest</h1>
                <AddBlog />
              </div>
            )}
          </div>
        </div>
        {address && (
          <div className={"w-full "}>
            <BlogList address={isAllBlogs ? "All" : address} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
