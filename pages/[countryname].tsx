import type { GetStaticPaths, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";

import { GetStaticProps } from "next";
import detailsStyle from "../styles/Details.module.css";

const Countryname = ({
  countryInfo,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
      currenciesString += h + " , ";
    }
    return currenciesString;
  };

  return (
    <section className={detailsStyle.main}>
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

export const getStaticProps: GetStaticProps = async (context: any) => {
  const name = context.params.countryname;
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${name}?fullText=true`
  );
  const countryInfo = await res.json();
  return {
    props: { countryInfo },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://restcountries.com/v3.1/all");
  const countries = await res.json();
  const countriesPaths = countries.map((country: any) => {
    return { params: { countryname: country.name.common } };
  });

  return {
    paths: countriesPaths,
    fallback: false,
  };
};
export default Countryname;
