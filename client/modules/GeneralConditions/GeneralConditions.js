import React from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

import { CardContent } from '@material-ui/core';

import styles from './GeneralConditions.css';

const classes = theme => ({
  card: {
    height: '100%',
  },
  paper: {
    width: '97%',
    height: 1000,
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
  },
});
const GeneralCondiions = () => (
  <Card className={classes.card}>
    <Paper className={classes.paper}>
      <CardContent>
        <div className={styles.general_conditions}>
          <h1>
            <span>Mentions l&eacute;gales</span>
          </h1>
          <p className={styles.date_modified}>modifié le 06/12/2018</p>
          <h2>
            <span>Informations &eacute;diteurs</span>
          </h2>
          <p>
            <span>
              Ce site est g&eacute;r&eacute; par la D&eacute;l&eacute;gation
              &agrave; la s&eacute;curit&eacute; routi&egrave;re (DSR) Place
              Beauvau - 75800 PARIS CEDEX 08 T&eacute;l. : 01 49 27 49 27
            </span>
          </p>
          <h2>
            <span>Directeur de la publication</span>
          </h2>
          <p>
            <span>
              Emmanuel Barbe, d&eacute;l&eacute;gu&eacute;
              interminist&eacute;riel &agrave; la S&eacute;curit&eacute;
              routi&egrave;re
            </span>
          </p>
          <h2>
            <span>Cr&eacute;dits</span>
          </h2>
          <p>
            <span>
              Le minist&egrave;re de l&#39;Int&eacute;rieur est titulaire des
              droits relatifs &agrave; la propri&eacute;t&eacute; intellectuelle
              des contenus (infographies et autres &eacute;l&eacute;ments
              techniques et graphiques), disponibles sur le site
              beta.interieur.gouv.fr/candilib.
            </span>
          </p>
          <p>
            <span>
              Ces &eacute;l&eacute;ments sont couverts par des droits de
              propri&eacute;t&eacute; intellectuelle de tiers. En application du
              code de la propri&eacute;t&eacute; intellectuelle, toute
              reproduction ou repr&eacute;sentation partielle ou totale pour
              quelque usage que ce soit est interdite sans l&#39;accord
              pr&eacute;alable des titulaires de droits. Pour toute demande de
              reproduction,
            </span>
            <span>&nbsp;</span>
            <span>
              <a href="mailto:candilib@interieur.gouv.fr">contactez-nous</a>
            </span>
          </p>
          <h2>
            <span>Conception et r&eacute;alisation</span>
          </h2>
          <p>
            <span>Conception et r&eacute;alisation Lab</span>
            <span>
              <a href="https://www.google.com/url?q=https://www.interieur.gouv.fr/Le-ministere/Secretariat-general/Direction-des-systemes-d-information-et-de-communication&amp;sa=D&amp;ust=1544114169844000">
                &nbsp;
              </a>
            </span>
            <span>
              <a href="https://www.google.com/url?q=https://www.interieur.gouv.fr/Le-ministere/Secretariat-general/Direction-des-systemes-d-information-et-de-communication&amp;sa=D&amp;ust=1544114169845000">
                DSIC
              </a>
            </span>
            <span>
              &nbsp;du minist&egrave;re de l&#39;Int&eacute;rieur avec le
            </span>
            <span>&nbsp;</span>
            <span>
              Bureau du permis de conduire et de l&rsquo;organisation des
              examens
            </span>
            <span>&nbsp;(BRPCE)</span>
            <span>
              &nbsp;de la D&eacute;l&eacute;gation &agrave; la
              s&eacute;curit&eacute; routi&egrave;re (
            </span>
            <span>
              <a href="https://www.google.com/url?q=http://www.securite-routiere.gouv.fr/la-securite-routiere/qui-sommes-nous/la-delegation-a-la-securite-routiere&amp;sa=D&amp;ust=1544114169848000">
                DSR
              </a>
            </span>
            <span>)</span>
          </p>
          <h3>
            <span>Liens hypertextes entrants</span>
          </h3>
          <p>
            <span>
              Tout site public ou priv&eacute; est autoris&eacute; &agrave;
              &eacute;tablir, sans autorisation pr&eacute;alable, un lien vers
              les informations diffus&eacute;es dans ce site. En revanche les
              pages du site beta.interieur.gouv.fr/candilib ne doivent pas
              &ecirc;tre imbriqu&eacute;es &agrave; l&rsquo;int&eacute;rieur des
              pages d&rsquo;un autre site : rien ne doit m&eacute;prendre le
              visiteur sur l&rsquo;origine d&rsquo;une page vue. Le
              minist&egrave;re de l&#39;Int&eacute;rieur se r&eacute;serve le
              droit de demander la suppression d&#39;un lien qu&#39;il estime
              non-conforme &agrave; l&#39;objet du site, &agrave; ses missions
              ou plus g&eacute;n&eacute;ralement &agrave; l&#39;&eacute;thique
              d&#39;un portail public. L&rsquo;autorisation de mise en place
              d&rsquo;un lien est valable pour tout support, &agrave;
              l&rsquo;exception de ceux diffusant des informations &agrave;
              caract&egrave;re pol&eacute;mique, pornographique,
              x&eacute;nophobe ou pouvant, dans une plus large mesure, porter
              atteinte &agrave; la sensibilit&eacute; du plus grand nombre.
            </span>
          </p>
          <h3>
            <span>Liens hypertextes sortants</span>
          </h3>
          <p>
            <span>
              Le site pr&eacute;cise en permanence l&#39;identit&eacute; des
              sites externes indiqu&eacute;s en lien, et ce sur toutes les
              pages. N&eacute;anmoins, ces pages web dont les adresses URL sont
              r&eacute;guli&egrave;rement v&eacute;rifi&eacute;es ne font pas
              partie du site et par cons&eacute;quent n&#39;engagent en rien la
              responsabilit&eacute; du site beta.interieur.gouv.fr/candilib.
            </span>
          </p>
          <h3>
            <span>Stabilit&eacute; des adresses</span>
          </h3>
          <p>
            <span>
              Nous essayons de maintenir des adresses URL de pages stables.
              Toutefois, ce site pouvant faire &agrave; tout moment
              l&rsquo;objet de r&eacute;organisations, nous ne pouvons pas
              garantir la stabilit&eacute; de l&rsquo;adresse des pages internes
              du site.
            </span>
          </p>
          <h3>
            <span>Droit d&rsquo;auteur</span>
          </h3>
          <p>
            <span>
              Les contenus disponibles sur ce site sont prot&eacute;g&eacute;s
              par le droit d&rsquo;auteur. Au terme de l&rsquo;article L. 122-4
              du Code de la propri&eacute;t&eacute; intellectuelle, vous ne
              pouvez reproduire tout ou partie de ces &oelig;uvres sans en avoir
              obtenu l&rsquo;autorisation expresse au pr&eacute;alable.
            </span>
          </p>
          <h3>
            <span>Code applicatif open source</span>
          </h3>
          <p>
            <span>Conform&eacute;ment &agrave; la</span>
            <span>
              <a href="https://www.google.com/url?q=https://www.legifrance.gouv.fr/affichLoiPubliee.do?idDocument%3DJORFDOLE000031589829%26type%3Dgeneral%26legislature%3D14&amp;sa=D&amp;ust=1544114169850000">
                &nbsp;
              </a>
            </span>
            <span>
              <a href="https://www.google.com/url?q=https://www.legifrance.gouv.fr/affichLoiPubliee.do?idDocument%3DJORFDOLE000031589829%26type%3Dgeneral%26legislature%3D14&amp;sa=D&amp;ust=1544114169850000">
                loi pour une R&eacute;publique num&eacute;rique
              </a>
            </span>
            <span>, le code de l&#39;application </span>
            <span>Candilib</span>
            <span>&nbsp;est libre et opensource, publi&eacute; sous</span>
            <span>
              <a href="https://www.google.com/url?q=https://www.gnu.org/licenses/lgpl-3.0.fr.html&amp;sa=D&amp;ust=1544114169851000">
                &nbsp;
              </a>
            </span>
            <span>
              <a href="https://www.google.com/url?q=https://www.gnu.org/licenses/lgpl-3.0.fr.html&amp;sa=D&amp;ust=1544114169851000">
                licence LGPL
              </a>
            </span>
            <span>&nbsp;sur</span>
            <span>
              <a href="https://www.google.com/url?q=https://github.com/LAB-MI/candilib&amp;sa=D&amp;ust=1544114169851000">
                &nbsp;
              </a>
            </span>
            <span>
              <a href="https://www.google.com/url?q=https://github.com/LAB-MI/candilib&amp;sa=D&amp;ust=1544114169851000">
                Github
              </a>
            </span>
            <span>.</span>
          </p>
          <p>
            <span />
          </p>
          <p>
            <span />
          </p>
          <h3>
            <span>Disponibilit&eacute;</span>
          </h3>
          <p>
            <span>
              Le minist&egrave;re de l&rsquo;Int&eacute;rieur s&rsquo;efforce de
              donner acc&egrave;s en continu au site. N&eacute;anmoins, la
              responsabilit&eacute; du minist&egrave;re de
              l&rsquo;Int&eacute;rieur ne peut &ecirc;tre engag&eacute;e en cas
              de non accessibilit&eacute; &agrave; son site internet et &agrave;
              l&rsquo;ensemble des t&eacute;l&eacute;services propos&eacute;s.
            </span>
          </p>
          <h3>
            <span>
              Propri&eacute;t&eacute; intellectuelle et droits d&#39;utilisation
            </span>
          </h3>
          <p>
            <span>
              L&#39;utilisateur s&#39;engage, sous peine de voir sa
              responsabilit&eacute; civile et/ou p&eacute;nale engag&eacute;e,
              &agrave; ne pas utiliser le site Internet de
              l&rsquo;&eacute;diteur pour :
            </span>
          </p>
          <p>
            <ul>
              <li>
                <span>
                  transmettre par quelque proc&eacute;d&eacute; que ce soit
                  (e-mail ou autres), tout contenu incluant des programmes, des
                  codes, des virus, etc. destin&eacute;s &agrave;
                  d&eacute;truire ou limiter les fonctionnalit&eacute;s du site
                  Internet de l&rsquo;&eacute;diteur.
                </span>
              </li>
              <li>
                <span>
                  transmettre par quelque proc&eacute;d&eacute; que ce soit dans
                  les services interactifs propos&eacute;s sur le site Internet
                  de l&rsquo;&eacute;diteur, tout contenu illicite ou nuisible,
                  et notamment des photos ou messages &agrave; caract&egrave;re
                  injurieux, insultant, diffamant, d&eacute;nigrant,
                  d&eacute;gradant, raciste, x&eacute;nophobe, sexiste,
                  pornographique, mena&ccedil;ant ou qui pourrait inciter
                  &agrave; la haine ou au harc&egrave;lement et allant &agrave;
                  l&#39;encontre du droit au respect de la vie priv&eacute;e ou
                  sans rapport avec les th&egrave;mes propos&eacute;s,
                </span>
              </li>
              <li>
                <span>
                  transmettre par quelque proc&eacute;d&eacute; que ce soit,
                  tout contenu et notamment des photos violant les droits de la
                  propri&eacute;t&eacute; intellectuelle, industrielle, les
                  droits de la personne, etc.
                </span>
              </li>
            </ul>
          </p>
          <h2>
            <span>Protection des donn&eacute;es personnelles</span>
          </h2>
          <h3>
            <span>Responsable du traitement</span>
          </h3>
          <p>
            <span>
              Le responsable de traitement est la d&eacute;l&eacute;gation
              &agrave; la s&eacute;curit&eacute; routi&egrave;re (DSR).
            </span>
          </p>
          <h3>
            <span>Finalit&eacute; du traitement</span>
          </h3>
          <p>
            <span>
              La finalit&eacute; du traitement des donn&eacute;es personnelles
              est exclusivement de fournir, aux candidats libres, des places
              d&rsquo;examen &agrave; l&rsquo;&eacute;preuve pratique du permis
              de conduire.
            </span>
          </p>
          <h3>
            <span>Donn&eacute;es personnelles collect&eacute;es</span>
          </h3>
          <p>
            <span>
              Les donn&eacute;es collect&eacute;es par Candilib sont :
            </span>
          </p>
          <ul>
            <li>
              <span>Code Neph</span>
            </li>
            <li>
              <span>nom </span>
            </li>
            <li>
              <span>pr&eacute;nom </span>
            </li>
            <li>
              <span>adresse mail</span>
            </li>
            <li>
              <span>adresse postale</span>
            </li>
            <li>
              <span>num&eacute;ro de t&eacute;l&eacute;phone</span>
            </li>
          </ul>
          <h3>
            <span>Mesures de protection des donn&eacute;es</span>
          </h3>
          <p>
            <span>
              Les donn&eacute;es personnelles sont prot&eacute;g&eacute;es par
              les moyens suivants :
            </span>
          </p>
          <ul>
            <li>
              <span>
                Les &eacute;changes avec le site Candilb sont
                s&eacute;curis&eacute;s par le protocole https
              </span>
            </li>
            <li>
              <span>
                Le service est h&eacute;berg&eacute; sur les serveurs du
                Minist&egrave;re de l&rsquo;int&eacute;rieur
              </span>
            </li>
          </ul>
          <h3>
            <span>Gestion des donn&eacute;es</span>
          </h3>
          <p>
            <span>
              Les donn&eacute;es sont conserv&eacute;es pour une dur&eacute;e de
              1 an maximum et sont ensuite effac&eacute;es.
            </span>
          </p>
          <p>
            <span>
              Les donn&eacute;es sont effac&eacute;es avant l&#39;expiration du
              d&eacute;lai de 1 an,{' '}
            </span>
            <span>
              si la validit&eacute; du code de la route arrive &agrave; terme
              et/ou si l&#39;examen pratique du permis de conduire est
              r&eacute;ussi.
            </span>
          </p>
          <h3>
            <span>Droit d&#39;acc&egrave;s</span>
          </h3>
          <p>
            <span>
              Vous b&eacute;n&eacute;ficiez d&#39;un droit d&#39;acc&egrave;s
              &agrave; vos donn&eacute;es, de rectification ou
              d&rsquo;effacement de celles-ci, d&rsquo;un droit &agrave; la
              limitation de leur traitement, de portabilit&eacute; et de retirer
              votre consentement &agrave; tout moment.
            </span>
          </p>
          <p>
            <span>Pour ce faire, vous pouvez vous adresser &agrave; la </span>
            <span>
              D&eacute;l&eacute;gation &agrave; la s&eacute;curit&eacute;
              routi&egrave;re, Place Beauvau - 75800 PARIS CEDEX 08
            </span>
            <span>&nbsp;ou par mail : </span>
            <span>
              <a href="mailto:candilib@interieur.gouv.fr">
                candilib@interieur.gouv.fr
              </a>
            </span>
            <span>
              , en joignant un titre d&rsquo;identit&eacute; afin de pouvoir
              traiter votre demande.
            </span>
          </p>
          <p>
            <span>
              Vous avez la possibilit&eacute; d&rsquo;introduire une
              r&eacute;clamation aupr&egrave;s d&rsquo;une autorit&eacute; de
              contr&ocirc;le.
            </span>
          </p>
        </div>
      </CardContent>
    </Paper>
  </Card>
);
export default GeneralCondiions;
