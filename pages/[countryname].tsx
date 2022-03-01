import type { InferGetServerSidePropsType, NextPage } from "next";
import Image from "next/image";
import homeStyle from "../styles/Home.module.css";
import Link from "next/link";

import { useEffect, useRef, useState } from "react";
import getCountries from "../Functions/getCountries";
import useGetCountries from "../Functions/getCountries";
import { GetStaticProps } from "next";
import { on } from "stream";
import Router, { useRouter } from "next/router";
import detailsStyle from "../styles/Details.module.css";

const Countryname = ({ countryInfo }) => {
  console.log(countryInfo);
  // const router = useRouter();

  // function toPage() {
  //   console.log(router);
  //   router.push("/");
  // }

  const {
    name: { common: commonName, nativeName },
    population,
    region,
    subregion,
    capital: [capital],
    tld: [topLevelDomain],
    currencies,
    languages,
    borders,
    flags: { png: image },
  } = countryInfo[0];

  // console.log(countryInfo[0]);

  // console.log(commonName);
  // console.log(nativeName[Object.keys(nativeName)[0]].common);
  // console.log(population);
  // console.log(region);
  // console.log(subregion);
  // console.log(capital);
  // console.log(topLevelDomain);
  // console.log(currencies);
  // console.log(borders);
  // console.log(languages);
  const getLanguages = (lang: []) => {
    let languagesString = "";
    for (let h in lang) {
      languagesString += lang[h] + " , ";
    }
    return languagesString;
  };

  const getCurrencies = (currency: []) => {
    let currenciesString = "";
    for (let h in currency) {
      console.log("h", h);
      currenciesString += h + " , ";
    }
    return currenciesString;
  };
  // console.log(getCurrencies(currencies));

  return (
    <section className={detailsStyle.main}>
      {/* <div onC>Back</div> */}
      <Link href="/">
        <a className={detailsStyle.back}>go back</a>
      </Link>
      <div className="counriesInfo">
        <div
          className="imageCon"
          style={{ position: "relative", width: "100%", height: "45.66vw" }}
        >
          <Image src={image} layout="fill" />
        </div>
        <div className="infos">
          <div className="infos-1">
            <h2 className="title">{commonName}</h2>
            <dl>
              <div>
                <dt>NativeName : </dt>
                <dd>{nativeName[Object.keys(nativeName)[0]].common}</dd>
              </div>
              <div>
                <dt>Population : </dt>
                <dd>{population}</dd>
              </div>
              <div>
                <dt>Ragion : </dt>
                <dd>{region}</dd>
              </div>
              <div>
                <dt>Sub Region : </dt>
                <dd>{subregion}</dd>
              </div>
              <div>
                <dt>Capital : </dt>
                <dd>{capital}</dd>
              </div>
            </dl>
          </div>
          <div className={detailsStyle.info2}>
            <dl>
              <div>
                <dt>Top Level Domain</dt>
                <dd>{topLevelDomain}</dd>
              </div>
              <div>
                <dt>Currencies</dt>
                <dd>{getCurrencies(currencies)}</dd>
              </div>
              <div>
                <dt>Languages : </dt>
                <dd>{getLanguages(languages)}</dd>
              </div>
            </dl>
          </div>
          <div className="info-3">
            <dt>Border Countries : </dt>
            <br />
            <div className={detailsStyle.flex}>
              {borders.map((border: string) => {
                return (
                  <dd className={detailsStyle.borders} key={border}>
                    {border}
                  </dd>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getStaticProps(context: any) {
  const name = context.params.countryname;
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  const countryInfo = await res.json();
  return {
    props: { countryInfo },
  };
}

export async function getStaticPaths() {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();
  const countriesPaths = countries.map((country: any) => {
    return { params: { countryname: country.name.common } };
  });

  return {
    paths: countriesPaths,
    fallback: false,
  };
}
export default Countryname;
