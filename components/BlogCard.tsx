import { Web3Button } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { useState } from "react";
type Props = {
  index: any;
  blogTitle: string;
  blogContent: string;
};
export default function BlogCard({ index, blogTitle, blogContent }: Props) {
  return (
    <div
      className={
        "flex flex-row justify-between w-full h-1/5 mb-2.5 px-4 py-2 rounded-[10px] h-auto "
      }
    >
      <div className={" text-white"}>
        <div className={"text-2xl font-bold leading-8 tracking-tight"}>
          {blogTitle}
        </div>
        <br />
        <div className={"prose max-w-none text-gray-500 dark:text-gray-400"}>
          {blogContent}
        </div>
      </div>

      <Web3Button
        style={{ height: "10px", width: "10px", background: "lightcoral" }}
        className={
          " min-h-0 nim-w-0 cursor-pointer bg-[lightcoral] text-white  rounded-[5px] border-[none]"
        }
        contractAddress={CONTRACT_ADDRESS}
        action={(contract) => contract.call("deletePost", [index])}
        onSuccess={() => {
          alert("Blog deleted");
        }}
      >
        Delete
      </Web3Button>
    </div>
  );
}
