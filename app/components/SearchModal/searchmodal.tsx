import React, { useEffect, useState } from "react";
import styles from "./searchmodal.module.css";
import InputField from "@/app/uikits/Input/Input";
import { UseClickOutside } from "@/hooks/ClickOutside";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { searchPosts } from "@/app/context/Actions/Actions";
import Loader from "../Loader/Loader";
import Button from "@/app/uikits/Button/button";
import { useRouter } from "next/navigation";
import { SEARCH } from "@/app/Routes/RoutesUrl";
import Link from "next/link";

type SearchModalType = {
  handleclose: () => void;
  handlefocus: (event: React.FocusEvent<HTMLInputElement>) => void;
};
const SearchModal = ({ handleclose, handlefocus }: SearchModalType) => {
  //  const ref = UseClickOutside(handleclose);
  const [searched, setSearched] = useState([]);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();
  const searchterm = watch("search");

  const handlesearch = async () => {
    let newstr = searchterm;
    if (searchterm && searchterm?.includes(" ")) {
      newstr = searchterm?.split(" ")?.join("%10");
    }
    let data = await searchPosts({ search: searchterm });
    if (data?.status === "ok") {
      setSearched(data?.data);
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

        {isSubmitting ? (
          <Loader color="#000" />
        ) : searched.length === 0 ? (
          <p className={styles.emptystatetext}>
            search latest stories, tags and usernames...
          </p>
        ) : (
          <div>
            {searched
              ?.map((result) => {
                let excerpt = `${result?.content.slice(0, 150)}...`;
                return (
                  <div key={result.id} className={styles.resultDiv}>
                    <Link href={SEARCH(searchterm)} onClick={handleclose}>
                      <h4>{result?.title}</h4>
                    </Link>
                    <p>{excerpt}</p>
                  </div>
                );
              })
              .splice(0, 10)}
          </div>
        )}
        <div className={styles.modalclose} onClick={handleclose}>
          &times;
        </div>
        {searched.length === 0 ? (
          ""
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
