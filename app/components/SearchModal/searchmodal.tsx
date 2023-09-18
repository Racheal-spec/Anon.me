import React, { useEffect, useState } from "react";
import styles from "./searchmodal.module.css";
import { UseClickOutside } from "@/hooks/ClickOutside";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { searchPosts } from "@/app/context/Actions/Actions";
import Loader from "../Loader/Loader";
import Button from "@/app/uikits/Button/button";
import { useRouter } from "next/navigation";
import { SEARCH } from "@/app/Routes/RoutesUrl";
import Link from "next/link";
import { postType } from "@/app/Types/posts";
import SearchLoader from "../SearchLoader/SearchLoader";

type SearchModalType = {
  handleclose: () => void;
  handlefocus: (event: React.FocusEvent<HTMLInputElement>) => void;
};
const SearchModal = ({ handleclose, handlefocus }: SearchModalType) => {
  //  const ref = UseClickOutside(handleclose);
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
  const handlekeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(SEARCH(searchterm));
      handleclose();
      handleSubmit(handlesearch);
    }
  };

  useEffect(() => {
    if (searchterm) {
      setloading(true);
      handlesearch();
    }
  }, [searchterm]);
  return (
    <div className={styles.modal}>
      <div className={styles.modalcontent}>
        <div className={styles.inputClass}>
          <input
            placeholder="start typing..."
            className={styles.searchInput}
            onKeyDown={handlekeyDown}
            {...register("search", { required: true })}
          />
          <p className={styles.searchicon}>press &crarr; to view all results</p>
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
                  <p>{excerpt}</p>
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
            <Button pinkOutline>See all results</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
