import { IonCard, IonCardContent, IonCardHeader, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import axios from 'axios';
import cheerio from 'cheerio';
import { Virtuoso } from 'react-virtuoso'
import { IonAvatar, IonItem, IonLabel, IonInput, IonToggle, IonRadio, IonCheckbox, IonItemSliding, IonItemOption, IonItemOptions } from '@ionic/react';
import { link } from 'fs';
import React, { useEffect, useState } from "react";
import { SERVFAIL } from 'dns';
import { data } from '../data/json';

function lines(text: String) {  // function that will convert the text into a table 
  let table = text.split('\n\n\n');
  let array = [];
  for (let i = 0; i < table.length; i++) {
    array.push(table[i].split('\n').join('  '));
  }
  return array;
}


const Tab1: React.FC = () => {
  let table: any[] = [];
  let tabletwo: any[] = [];
  const [val, setVal] = useState("");
  const [line, setline] = useState(tabletwo);
  const [tableOfLinks,setTableOfLinks] = useState(table);
  const a = (async  () => {
    // here is the link of the website
    let url = `https://www.portaljob-madagascar.com/emploi/liste`;
    try {// if there is no error
      // getting all the html elements of the website
      let response = await axios.get(url);
      // loading the respose.data with cheerio
      let $ = cheerio.load(response.data);
      // getting all the text inside the div with the class left_item with cheerio
      setVal($('aside.contenu_annonce').text());
      // getting the links
      let links: any[] = [];
      $('aside.contenu_annonce>a').each((index, value) => {
        let link: any;
        link = $(value).attr('href');
        links.push(link);
      });
      setTableOfLinks(links);
      setline(lines(val));
      console.log(line);
    } catch (e: any) {// if there is an error
      console.error(`Error ${e.message}`);
    }
  });
  useEffect(() => {
    a();
  })
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des job offers</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        {data.map((item) =>(
            <IonCard className='IonCard'>
              <IonCardHeader>{item.post}</IonCardHeader>
              <IonCardContent>{item.society}</IonCardContent>
            </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
