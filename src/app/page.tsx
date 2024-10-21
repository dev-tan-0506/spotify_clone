"use client";

import { useEffect, useState } from "react";
import useAPI from "./utils/fetchApi";
import { Singer } from "./interfaces/Singer";
import AddSingerModal from "./components/AddSingerModal";
import ListSingers from "./components/ListSingers";

export default function Home() {
  const [singers, setSingers] = useState<Singer[]>([]);

  const getListSingers = async () => {
    const url = "singers";
    const response = await useAPI.get(url);
    if (response) {
      setSingers(response);
    }
  };

  useEffect(() => {
    console.log(singers);
  }, [singers]);

  useEffect(() => {
    getListSingers();
  }, []);

  return (
    <div className="home-main-content" id="home-main-content">
      <div>
        <ListSingers singers={singers}></ListSingers>
        <AddSingerModal></AddSingerModal>
      </div>
    </div>
  );
}
