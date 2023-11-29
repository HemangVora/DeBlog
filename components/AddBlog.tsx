import { useState } from "react";

import { Web3Button } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
const AddBlog: NextPage = () => {
  const [blogModal, setBlogModal] = useState(false);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");

  function ResetForm() {
    setBlogTitle("");
    setBlogContent("");
  }
  return (
    <div>
      {!blogModal ? (
        <button
          className={
            " bg-white text-black cursor-pointer p-2 rounded-[5px] border-[none]"
          }
          onClick={() => {
            setBlogModal(true);
          }}
        >
          New Blog
        </button>
      ) : (
        <div className={"h-screen w-screen fixed bg-[#00000080] left-0 top-0"}>
          <div
            className={
              "flex flex-col justify-center items-center bg-[#131313] w-[30%] h-2/5 fixed -translate-x-2/4 -translate-y-2/4 p-4 rounded-[10px] left-2/4 top-2/4"
            }
          >
            <div
              className={
                "flex flex-row justify-between items-center p-1 w-full h-10"
              }
            >
              <h3>New Blog</h3>
              <button
                className={
                  "bg-red-500 text-white   cursor-pointer  p-1 px-2 h-8 rounded-[5px] "
                }
                onClick={() => setBlogModal(false)}
              >
                X
              </button>
            </div>
            <div
              className={
                "flex flex-col w-full mt-4 font-dmsans justify-start h-full"
              }
            >
              <input
                className={
                  "mt-10 h-10 p-3 rounded-[5px] text-black font-dmsans"
                }
                type="text"
                placeholder="Title"
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
              />
              <textarea
                className={"mt-5 p-3 rounded-[5px] text-black font-dmsans"}
                type="text"
                placeholder="Content.."
                value={blogContent}
                onChange={(e) => setBlogContent(e.target.value)}
              />
            </div>{" "}
            <Web3Button
              contractAddress={CONTRACT_ADDRESS}
              action={(contract) =>
                contract.call("createPost", [blogTitle, blogContent])
              }
              onSuccess={() => {
                ResetForm();
                setBlogModal(false);
                alert("Blog Added");
              }}
            >
              Add Blog
            </Web3Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBlog;
