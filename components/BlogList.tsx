import { useState } from "react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import { CONTRACT_ADDRESS } from "../const/addresses";
import BlogCard from "./BlogCard";

export default function BlogList({ address }) {
  const { contract } = useContract(CONTRACT_ADDRESS);

  const { data: blogs, isLoading: isLoadingBlogs } = useContractRead(
    contract,
    "viewAllPosts"
  );
  const [isAllPost, setIsAllPost] = useState(address);

  return (
    <div>
      {!isLoadingBlogs ? (
        blogs?.length > 0 ? (
          blogs.map((blog: any, index: number) => {
            if (address == "All") {
              if (!blog.isDeleted) {
                return (
                  <BlogCard
                    key={index}
                    index={Number(blog.id)}
                    blogTitle={blog.title}
                    blogContent={blog.content}
                  />
                );
              }
            } else {
              if (!blog.isDeleted) {
                if (blog.author == isAllPost) {
                  return (
                    <BlogCard
                      key={index}
                      index={Number(blog.id)}
                      blogTitle={blog.title}
                      blogContent={blog.content}
                    />
                  );
                }
              }
            }
          })
        ) : (
          <p>No Blogs found.</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
