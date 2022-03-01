import type { InferGetServerSidePropsType, NextPage } from "next";
import Image from "next/image";
import homeStyle from "../styles/Home.module.css";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import getCountries from "../Functions/getCountries";
import useGetCountries from "../Functions/getCountries";
import { GetStaticProps } from "next";
import { on } from "stream";
import { stringify } from "querystring";
import useSWR from "swr";

interface CountryInfo {
  name: string;
  population: number;
  region: string;
  capital: string[];
  image: string;
}

const Home: NextPage = () => {
  function getRandomKey() {
    const key1 = Date.now().toString();
    const alphabets = [
      "ab%$%#^%$^%cdefjhijklm^%&^%^nopq56876$%#%#$@!@rstuvwxwz43987",
    ];
    let key2 = "";
    let i = 0;
    while (i < 15) {
      key2 += alphabets[Math.floor(Math.random() * alphabets.length)];
      i++;
    }
    return key1 + key2;
  }

  const fetcher = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    const countriesInfo = data.map((country: any) => {
      const {
        name: { common: commonName },
        population,
        region,
        flags: { png: image },
      } = country;
      const capital = country.capital || ["there is no capital"];
      return { commonName, population, region, capital, image };
    });
    return countriesInfo;
  };

  const { data, error } = useSWR("https://restcountries.com/v3.1/all", fetcher);

  useEffect(() => {
    console.log(data);
    console.log("err", error);
  }, []);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <div className={homeStyle.mainContainer}>
      <div className={homeStyle.filterCon}>
        <div className={homeStyle.search}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="search for a country ..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          name="region"
          id=""
          onChange={(e) => setFilter(e.target.value)}
          className={homeStyle.regionSelect}
        >
          <option defaultValue="all" disabled>
            Filter by Region
          </option>
          <option value="all">All</option>
          <option value="africa">Africa</option>
          <option value="americas">America</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
        </select>
      </div>

      <div className={homeStyle.grid}>
        {data &&
          (filter !== "all"
            ? data
                .filter((country: any) => {
                  return (
                    country.region.toLowerCase() === filter.toLowerCase() &&
                    country.commonName
                      .toLowerCase()
                      .startsWith(search.toLowerCase())
                  );
                })
                .map((country: any) => {
                  return (
                    <Country
                      key={country.commonName}
                      name={country.commonName}
                      population={country.population}
                      region={country.region}
                      capital={country.capital[0]}
                      image={country.image}
                    />
                  );
                })
            : data
                .filter((country: any) => {
                  return country.commonName
                    .toLowerCase()
                    .startsWith(search.toLowerCase());
                })
                .map((country: any) => {
                  return (
                    <Country
                      key={country.commonName}
                      name={country.commonName}
                      population={country.population}
                      region={country.region}
                      capital={country.capital[0]}
                      image={country.image}
                    />
                  );
                }))}
      </div>
    </div>
  );
};

const Country = (props: CountryInfo) => {
  return (
    <Link href="/countryname" as={`/${props.name}`}>
      <div className={homeStyle.countryDiv}>
        <div
          className="imageWrapper"
          style={{ position: "relative", width: "100%", height: "35.66vw" }}
        >
          <Image src={props.image} layout="fill" objectFit="cover" />
        </div>
        <div className={homeStyle.infoCon}>
          <h2>{props.name}</h2>
          <dl>
            <div>
              <dt>Population :</dt>
              <dd>{props.population}</dd>
            </div>
            <div>
              <dt>Region :</dt>
              <dd>{props.region}</dd>
            </div>
            <div>
              <dt>Capital :</dt>
              <dd>{props.capital}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Link>
  );
};

export default Home;
