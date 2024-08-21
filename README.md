### Linkki osoitteeseen, jossa sovellus on käynnissä

https://server-dawn-night-7149-video-course-platform.fly.dev/

### Lyhyt kuvaus sovelluksesta

Sovelluksen avulla kirjautunut käyttäjä voi luoda videomateriaaliin perustuvia kursseja.
Ideana oli ns. reverse engineerata muutama keskeinen osa Udemy -nimisestä web sovelluksesta.
Linkki Udemyyn: https://www.udemy.com/. Sovelluksen UI soveltuu vähintään noin 1100px leveään
ikkunaan.

### Sovelluksen demovideo

Jos haluat katsoa sovelluksen esittelyvideon, löydät sen sovelluksen alapalkista (footer) linkistä nimeltä "About us". Eli sivustolle: https://server-dawn-night-7149-video-course-platform.fly.dev/
ja klikkaamalla etusivun alhaalla footerista About us.

### Sovelluksen käyttöohje / toiminnot

Sovelluksen käyttöliittymä on aika intuitiivinen, joten tuskin tarvitset näitä käyttöohjeita. Huomiona kuitenkin, että sovelluksessa on sellaisiakin linkkejä ja nappeja, joiden toimintoja ei ole implementoitu.

1. Voit luoda tilin sovellukseen 3 eri paikasta: etusivun yläpalkin sign up napista, /teaching sivun bannerin get started napista tai /teaching sivun alhaalta get started napista. Tilin luontisähköpostin ei tarvi olla aito sähköposti.

2. Onnistuneen tilin luonnin jälkeen sovellus kirjaa sinut sisään ja ohjaa etusivulle. Jos tilin teossa valitsit "Stay logged in on this device" sovellus kirjaa sinut myös jatkossa sisään kun lataat sovelluksen.

3. Kirjautuneena sovellukseen voit navigoida etusivun yläpakista "Instructor" sivulle napista instructor.

4. Instructor sivulla on ylhäällä ja alhaalla nappi create your course, josta painamalla pääset kurssin luontisivulle.

5. Kurssin luontisivu on 4 vaiheinen ja se ohjaa sinua eteenpäin kysymyksillä. Pääset etenemään sekä palaamaan edelliseen kohtaan sivun alhaalla olevista napeista continue ja previous.

6. Kun olet kurssin luonnin viimeisessä vaiheessa ja valinnat on tehty, voit luoda kurssin napista create course.

7. Kurssin luonti ohjaa sinut takaisin instructor sivulle, jossa näet luomasi kurssit.

8. Pääset kurssin muokkaussivulle painamalla kurssikorttia.

9. Kurssin muokkaussivuja on kaksi: intended learners sekä curriculum. Muokkaussivuston osion voit valita muokkaussivun vasemmasta sivupalkista kohdista intended learners tai curriculum. Napit course structure ja film & edit ovat vain UI:n täytteenä ja johtavat sinut page not found sivulle.

10. Intended learners muokkaussivustolla voit lisätä kurssille tekstiin perustuvia itemeitä, joiden tarkoituksena on kertoa mitä kurssilla oppii, millaisia edellytyksiä kurssilla pärjäämiselle on sekä kenelle kurssi on tarkoitettu. Itemeitä voi uudelleenjärjestää hiirellä kun hiiri on itemin oikeassa reunassa "hampurilaisiconin" kohdalla.

11. Curriculum muokkaussivusto on sovelluksen keskeisin paikka. Siellä voit lisätä kurssille itemeitä, joita ovat osio (section) ja lecture (luento). Osion voit luoda napista + section. Osioihin voit luoda luentoja painamalla + curriculum item. Voit uudelleenjärjestää osioita ja luentoja vetämällä niitä hiirellä sopivasta kohtaa.

12. Voit lisätä luentoihin kuvauksen ja videon. Kuvausta pääset muokkaamaan tekstieditorilla, avaamalla ensin muokkausvaihtoehdot luennon otsakkeen oikeasta reunasta pienestä nuolesta alaspäin. Videon voit lisätä painamalla luennon kohdalta nappia + content.

13. Pääset tarkastelemaan lukujärjestystä muokkaussivun yläpalkista napista preview.

14. Preview sivulla voit oikeasta sivupalkista valita luennon, jolloin näet videomateriaalin, mikäli luento sisältää videon.

### Työaikakirjanpito

Työtuntien yhteenlaskettu määrä on (vähintään) 315 tuntia.

| Päivä | Aika | Mitä tein                                                                            |
| :---: | :--- | :----------------------------------------------------------------------------------- |
| 10.5. | 1    | Projektin alustus                                                                    |
| 11.5. | 4    | Teema, multilevel-dropdown, frontend komponentteja                                   |
| 12.5. | 4    | Multilevel-dropdown jatkuu, frontend komponentteja                                   |
| 13.5. | 8    | Multilevel-dropdown jatkuu, hakupalkki, osotoskori                                   |
| 14.5. | 8    | Kielen valinta, hero banner osio, luotetut yritykset osio                            |
| 15.5. | 8    | Etusivun päivityksiä, popup kurssikortit etusivulla                                  |
| 16.5. | 8    | Popup sijoittelun päivitys, ostoskorin tekoa                                         |
| 17.5. | 8    | Dropdown komponentin päivitystä, kurssikaruselli etusivulla                          |
| 18.5. | 4    | Uusi osio etusivulle, slick slider käyttöön oman sliderin sijaan                     |
| 19.5. | 4    | Top categories osio, etusivun päivityksiä                                            |
| 20.5. | 8    | Footer osio, etusivun päivityksiä                                                    |
| 21.5. | 8    | Not found -sivu, dropdown refaktoria, Teach with us -sivun tekoa                     |
| 22.5. | 8    | Teach with us -sivun tekoa, dropdown päivitystä                                      |
| 23.5. | 8    | Tilin luonti frontissa, muita päivityksiä fontissa                                   |
| 24.5. | 8    | Kurssin luontisivu                                                                   |
| 25.5. | 6    | Kurssin luonti frontissa                                                             |
| 26.5. | 0    | -                                                                                    |
| 27.5. | 6    | Frontin komponentteja                                                                |
| 28.5. | 8    | Kurssin muokkaussivu ja sivupalkki                                                   |
| 29.5. | 8    | Drag and drop systeemin tekoa (1 versio, perustui html dnd apiin)                    |
| 30.5. | 8    | Drag and drop systeemin tekoa, kurssin muokkaussivua, lukujärjestyseditoria          |
| 31.5. | 8    | Lukujärjestyseditorin tekoa                                                          |
| 1.6.  | 3    | Pieniä frontin päivityksiä, refaktoria                                               |
| 2.6.  | 0    | -                                                                                    |
| 3.6.  | 8    | Rich text editori kurssien descriptionille (perustuu slate kirjastoon)               |
| 4.6.  | 8    | Lukujärjestyseditorin tekoa, uudelleenjärjestäminen drag and dropilla                |
| 5.6.  | 8    | Drag and dropin (1 version) päivitys toimivaksi eri selaimilla                       |
| 6.6.  | 8    | Aloin työstämään drag and drop 2 versiota (ei html5 dnd apiin perustuva)             |
| 7.6.  | 8    | Drag and drop 2 versiota ja sen käyttö lukujärjestyksen uudelleenjärjestämisessä     |
| 8.6.  | 6    | Lukujärjestyksen uudelleenjärjestämisen optimointia: komponenttien memoisointi       |
| 9.6.  | 0    | -                                                                                    |
| 10.6. | 8    | Videoiden uploadaus frontissa                                                        |
| 11.6. | 8    | Videoiden uploadaus frontissa, lukujärjestyksen esikatselusivua                      |
| 12.6. | 8    | Palvelin ja tietokanta, kirjautuminen ja tilin luonti käyttää palvelinta             |
| 13.6. | 8    | Kirjautumissivu ja lomake frontissa                                                  |
| 14.6. | 8    | Kurssien luonti palvelimella                                                         |
| 15.6. | 4    | Kurssien haku palvelimelta                                                           |
| 16.6. | 0    | -                                                                                    |
| 17.6. | 1    | Reduxin resetointi logoutissa, kirjatutumistilan säilytys localstoragessa            |
| 18.6. | 8    | Kurssin eri osien luonti ja poisto palvelimella                                      |
| 19.6. | 8    | Lukujärjestyksen haku palvelimelta ja sen uudelleenjärjestäminen paikallisesti       |
| 20.6. | 0    | -                                                                                    |
| 21.6. | 0    | -                                                                                    |
| 22.6. | 0    | -                                                                                    |
| 23.6. | 0    | -                                                                                    |
| 24.6. | 8    | Lukujärjestyksen osien luontia palvelimella                                          |
| 25.6. | 0    | -                                                                                    |
| 26.6. | 8    | Lukujärjestyksen luentojen lisäämistä ja muokkausta palvelimella, videoiden lähetys  |
| 27.6. | 8    | Videon pituuden haku mp4 tiedostosta, videoiden tallennus palvelimella (ei pilvessä) |
| 28.6. | 8    | Videon striimaus palvelimelta (ei pilvessä)                                          |
| 29.6. | 0    | -                                                                                    |
| 30.6. | 0    | -                                                                                    |
| 1.7.  | 0    | -                                                                                    |
| 2.7.  | 0    | -                                                                                    |
| 3.7.  | 0    | -                                                                                    |
| 4.7.  | 4    | Internet deployauksen aloitus, postgres tietokanta pilvessä (aws)                    |
| 5.7.  | 0    | -                                                                                    |
| 6.7.  | 4    | Videoiden lähetys pilveen paloina suoraan clientiltä (aws s3 ämpäriin)               |
| 7.7.  | 0    | -                                                                                    |
| 8.7.  | 4    | Videoiden katsominen pilvestä                                                        |
| 9.7.  | 8    | Sovelluksen docker kuvan teko, sovellus nettiin (fly io)                             |
| 12.7. | 3    | Sekalaista, readmen tekoa                                                            |
| 13.7. | 5    | Sekalaista, muutamia bugfixejä, repon siistiminen, vika nettiversio deployment       |

### Huomioita

Muutama keskeinen tunnettu asia ja bugi, joita en korjannut ajankäytön puitteissa:

Videon uploadaamisen aikana uusien itemien lisäys lukujärjestykseen ei johda
välittömään lukujärjestyksen päivitykseen frontendissä. Kyseisessä tilanteessa
UI päivittyy vasta kun uploadaus on valmis.

Videoiden uploadaamiseen liittyviä tärkeitä ei-ilmepentoituja asioita ovat
ainakin uploadin hallittu peruuttaminen, keskeyttäminen ja jatkaminen sekä
jo ladatun videon näyttäminen valikossa, josta lähetetään uusi luentovideo.

Videoiden uploadausprosessi olisi hyvä erottaa web workereihin kokonaan
irti UI:sta ja react komponenteista. Tällä hetkellä UI:hin sidottu uploadaus
voi aiheuttaa ongelmia, kuten edellä mainittu UI:n viivästetty päivitys.

Luennon osiota (section) ei voi vaihtaa. Mietin kyllä tämän tekoa alun alkaen drag and dropiin
liittyen, koska se on tärkeä toiminnallisuus. Nykyisellä drag and drop systeemillä toiminnon
toteuttamisen pitäisi onnistua kohtuullisin muutoksin. Tällöin olisi varmaan hyödyksi muuttaa myös tietokantaa siten,
että luentojen järjestysnumerot ovat lukujärjestyskohtaisia, eivätkä osakohtaisia (section).

Devauksen aikana sijoitin funktioita, tyyppejä ja parsereita lähelle niiden käyttöpaikkaa / alkuperää. Kun siistin repoa siirsin
palvelimen puolella kaikki tyypit yhteen tiedostoon. Clientin puolella edelleen alkuperäinen järjestelytapa.
En ole varma kummasta tavasta tykkään enemmän. Toisaalta kun tyypit ym. on lähellä niiden alkuperää, on helpompi nähdä
välittömästi asiaan liittyvät tyypit, type-guardit ja parseritkin, mutta tiedostojen yleisilme on silloin vähän sekainen.

### Kuvia sovelluksesta

![fullstack_sovellus_kurssin_editointi_lukujärjestys](https://github.com/tuheli/video-course-platform/assets/94482031/13b15651-a43a-435e-a312-6ae88ee45e27)
![fullstack_sovellus_kurssin_esikatselu](https://github.com/tuheli/video-course-platform/assets/94482031/b4ba01f9-a937-4bcc-aab6-58b19800f8a6)
![fullstack_sovellus_kurssin_editointi_tavoitteet](https://github.com/tuheli/video-course-platform/assets/94482031/28df9069-1b27-4350-8185-ad644e7d92e3)
![fullstack_sovellus_käyttäjän_luontilomake](https://github.com/tuheli/video-course-platform/assets/94482031/8e396a82-23a4-43c6-8216-b75f09792389)
![fullstack_sovellus_etusivu](https://github.com/tuheli/video-course-platform/assets/94482031/36a89af3-5612-4ebb-932a-2be4110895b3)
![fullstack_sovellus_ensimmäisen_kurssin_luonti](https://github.com/tuheli/video-course-platform/assets/94482031/18350a1c-74cd-4964-894a-b2a33e2c310e)
![fullstack_sovellus_kurssin_luonti_askel_1](https://github.com/tuheli/video-course-platform/assets/94482031/414fbf87-958d-4255-bf1e-cdb9c31e9f2e)
![fullstack_sovellus_kurssin_luonti_askel_4](https://github.com/tuheli/video-course-platform/assets/94482031/270f7bbd-3bd2-4486-98ff-50e5d7a15cb8)
