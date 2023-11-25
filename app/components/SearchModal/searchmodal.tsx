import React, { useEffect, useState } from "react";
import styles from "./searchmodal.module.css";
import { useForm } from "react-hook-form";
import { searchPosts } from "@/app/context/Actions/Actions";
import Button from "@/app/uikits/Button/button";
import { useRouter } from "next/navigation";
import { SEARCH } from "@/app/Routes/RoutesUrl";
import Link from "next/link";
import { postType } from "@/app/Types/posts";
import SearchLoader from "../SearchLoader/SearchLoader";
import { changeTextFromHTML } from "@/app/services/HtmltoText";

type SearchModalType = {
  searchmodal: boolean;
  showSearchModal: any;
};
const SearchModal = React.memo(
  ({ searchmodal, showSearchModal }: SearchModalType) => {
    const [searched, setSearched] = useState([]);
    const [isloading, setloading] = useState(false);
    const router = useRouter();
    const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isSubmitting },
    } = useForm();
    const searchterm = watch("search")?.toLowerCase();

    console.log(searchmodal);
    const handleclose = () => {
      showSearchModal(false);
    };
    const handlesearch = async () => {
      let newstr = searchterm;
      if (searchterm && searchterm?.includes(" ")) {
        newstr = searchterm?.split(" ")?.join("%10");
      }

      let data = await searchPosts({
        search: searchterm,
        take: 10,
        lastCursor: "",
      });
      if (data?.status === "ok") {
        setSearched(data?.data);
        setloading(false);
      }
    };
    // const ref = UseClickOutside(handleclose);
    const handlekeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        router.push(SEARCH(searchterm));
        handleclose();
        handleSubmit(handlesearch);
      }
     
    };

    const handleClick = () => {
      router.push(SEARCH(searchterm));
      handleclose();
      handleSubmit(handlesearch);
    }

    useEffect(() => {
      if (searchterm) {
        setloading(true);
        handlesearch();
      }
    }, [searchterm]);
    return (
      <>
        {searchmodal ? (
          <div className={styles.modal}>
            <div className={styles.modalcontent}>
              <div className={styles.inputClass}>
                <input
                  placeholder="start typing..."
                  className={styles.searchInput}
                  onKeyDown={handlekeyDown}
                  {...register("search", { required: true })}
                />
                <p className={styles.searchicon}>
                  press &crarr; to view all results
                </p>
              </div>

              {isloading ? (
                <div className={styles.loaderdiv}>
                  <SearchLoader />
                </div>
              ) : (
                <div>
                  {searched?.map((result: postType) => {
                    let excerpt = `${result?.content.slice(0, 150)}...`;
                    return (
                      <div key={result.id} className={styles.resultDiv}>
                        <Link href={SEARCH(searchterm)} onClick={handleclose}>
                          <h4>{result?.title}</h4>
                        </Link>
                        <p>{changeTextFromHTML(excerpt)}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              <div className={styles.modalclose} onClick={handleclose}>
                &times;
              </div>
              {searched.length === 0 ? (
                <p className={styles.emptystatetext}>
                  search latest stories, tags and usernames...
                </p>
              ) : (
                <div className={styles.btnDiv}>
                  <Button pinkOutline onClick={handleClick}>See all results</Button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </>
    );
  }
);

export default SearchModal;
