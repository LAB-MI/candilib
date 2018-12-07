import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';


import styles from './GeneralConditions.css';

const jssStyles = theme => ({
  card: {
    height: '100%',
  },
  content: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});
const GeneralCondiions = ({ classes }) => (
  <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div className={styles.general_conditions}>
          <h1>
            <span>Mentions légales</span>
          </h1>
          <p className={styles.date_modified}>modifié le 06/12/2018</p>
          <h2>
            <span>Informations éditeurs</span>
          </h2>
          <p>
            <span>
              Ce site est géré par la Délégation
              à la sécurité routière (DSR) Place
              Beauvau - 75800 PARIS CEDEX 08 Tél. : 01 49 27 49 27
            </span>
          </p>
          <h2>
            <span>Directeur de la publication</span>
          </h2>
          <p>
            <span>
              Emmanuel Barbe, délégué
              interministériel à la Sécurité
            routière
          </span>
        </p>
        <h2>
          <span>Crédits</span>
        </h2>
        <p>
          <span>
            Le ministère de l&#39;Intérieur est titulaire des
            droits relatifs à la propriété intellectuelle
            des contenus (infographies et autres éléments
            techniques et graphiques), disponibles sur le site
            beta.interieur.gouv.fr/candilib.
          </span>
        </p>
        <p>
          <span>
            Ces éléments sont couverts par des droits de
            propriété intellectuelle de tiers. En application du
            code de la propriété intellectuelle, toute
            reproduction ou représentation partielle ou totale pour
            quelque usage que ce soit est interdite sans l&#39;accord
            préalable des titulaires de droits. Pour toute demande de
            reproduction,
          </span>
          <span>&nbsp;</span>
          <span>
            <a href="mailto:candilib@interieur.gouv.fr">contactez-nous</a>
          </span>
        </p>
        <h2>
          <span>Conception et réalisation</span>
        </h2>
        <p>
          <span>Conception et réalisation Lab</span>
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
            &nbsp;du ministère de l&#39;Intérieur avec le
          </span>
          <span>&nbsp;</span>
          <span>
            Bureau du permis de conduire et de l&rsquo;organisation des
            examens
          </span>
          <span>&nbsp;(BRPCE)</span>
          <span>
            &nbsp;de la Délégation à la
            sécurité routière (
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
            Tout site public ou privé est autorisé à
            établir, sans autorisation préalable, un lien vers
            les informations diffusées dans ce site. En revanche les
            pages du site beta.interieur.gouv.fr/candilib ne doivent pas
            &ecirc;tre imbriquées à l&rsquo;intérieur des
            pages d&rsquo;un autre site : rien ne doit méprendre le
            visiteur sur l&rsquo;origine d&rsquo;une page vue. Le
            ministère de l&#39;Intérieur se réserve le
            droit de demander la suppression d&#39;un lien qu&#39;il estime
            non-conforme à l&#39;objet du site, à ses missions
            ou plus généralement à l&#39;éthique
            d&#39;un portail public. L&rsquo;autorisation de mise en place
            d&rsquo;un lien est valable pour tout support, à
            l&rsquo;exception de ceux diffusant des informations à
            caractère polémique, pornographique,
            xénophobe ou pouvant, dans une plus large mesure, porter
            atteinte à la sensibilité du plus grand nombre.
          </span>
        </p>
        <h3>
          <span>Liens hypertextes sortants</span>
        </h3>
        <p>
          <span>
            Le site précise en permanence l&#39;identité des
            sites externes indiqués en lien, et ce sur toutes les
            pages. Néanmoins, ces pages web dont les adresses URL sont
            régulièrement vérifiées ne font pas
            partie du site et par conséquent n&#39;engagent en rien la
            responsabilité du site beta.interieur.gouv.fr/candilib.
          </span>
        </p>
        <h3>
          <span>Stabilité des adresses</span>
        </h3>
        <p>
          <span>
            Nous essayons de maintenir des adresses URL de pages stables.
            Toutefois, ce site pouvant faire à tout moment
            l&rsquo;objet de réorganisations, nous ne pouvons pas
            garantir la stabilité de l&rsquo;adresse des pages internes
            du site.
          </span>
        </p>
        <h3>
          <span>Droit d&rsquo;auteur</span>
        </h3>
        <p>
          <span>
            Les contenus disponibles sur ce site sont protégés
            par le droit d&rsquo;auteur. Au terme de l&rsquo;article L. 122-4
            du Code de la propriété intellectuelle, vous ne
            pouvez reproduire tout ou partie de ces &oelig;uvres sans en avoir
            obtenu l&rsquo;autorisation expresse au préalable.
          </span>
        </p>
        <h3>
          <span>Code applicatif open source</span>
        </h3>
        <p>
          <span>Conformément à la</span>
          <span>
            <a href="https://www.google.com/url?q=https://www.legifrance.gouv.fr/affichLoiPubliee.do?idDocument%3DJORFDOLE000031589829%26type%3Dgeneral%26legislature%3D14&amp;sa=D&amp;ust=1544114169850000">
              &nbsp;
            </a>
          </span>
          <span>
            <a href="https://www.google.com/url?q=https://www.legifrance.gouv.fr/affichLoiPubliee.do?idDocument%3DJORFDOLE000031589829%26type%3Dgeneral%26legislature%3D14&amp;sa=D&amp;ust=1544114169850000">
              loi pour une République numérique
            </a>
          </span>
          <span>, le code de l&#39;application </span>
          <span>Candilib</span>
          <span>&nbsp;est libre et opensource, publié sous</span>
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
          <span>Disponibilité</span>
        </h3>
        <p>
          <span>
            Le ministère de l&rsquo;Intérieur s&rsquo;efforce de
            donner accès en continu au site. Néanmoins, la
            responsabilité du ministère de
            l&rsquo;Intérieur ne peut &ecirc;tre engagée en cas
            de non accessibilité à son site internet et à
            l&rsquo;ensemble des téléservices proposés.
          </span>
        </p>
        <h3>
          <span>
            Propriété intellectuelle et droits d&#39;utilisation
          </span>
        </h3>
        <p>
          <span>
            L&#39;utilisateur s&#39;engage, sous peine de voir sa
            responsabilité civile et/ou pénale engagée,
            à ne pas utiliser le site Internet de
            l&rsquo;éditeur pour :
          </span>
        </p>
        <p>
          <ul>
            <li>
              <span>
                transmettre par quelque procédé que ce soit
                (e-mail ou autres), tout contenu incluant des programmes, des
                codes, des virus, etc. destinés à
                détruire ou limiter les fonctionnalités du site
                Internet de l&rsquo;éditeur.
              </span>
            </li>
            <li>
              <span>
                transmettre par quelque procédé que ce soit dans
                les services interactifs proposés sur le site Internet
                de l&rsquo;éditeur, tout contenu illicite ou nuisible,
                et notamment des photos ou messages à caractère
                injurieux, insultant, diffamant, dénigrant,
                dégradant, raciste, xénophobe, sexiste,
                pornographique, mena&ccedil;ant ou qui pourrait inciter
                à la haine ou au harcèlement et allant à
                l&#39;encontre du droit au respect de la vie privée ou
                sans rapport avec les thèmes proposés,
              </span>
            </li>
            <li>
              <span>
                transmettre par quelque procédé que ce soit,
                tout contenu et notamment des photos violant les droits de la
                propriété intellectuelle, industrielle, les
                droits de la personne, etc.
              </span>
            </li>
          </ul>
        </p>
        <h2>
          <span>Protection des données personnelles</span>
        </h2>
        <h3>
          <span>Responsable du traitement</span>
        </h3>
        <p>
          <span>
            Le responsable de traitement est la délégation
            à la sécurité routière (DSR).
          </span>
        </p>
        <h3>
          <span>Finalité du traitement</span>
        </h3>
        <p>
          <span>
            La finalité du traitement des données personnelles
            est exclusivement de fournir, aux candidats libres, des places
            d&rsquo;examen à l&rsquo;épreuve pratique du permis
            de conduire.
          </span>
        </p>
        <h3>
          <span>Données personnelles collectées</span>
        </h3>
        <p>
          <span>
            Les données collectées par Candilib sont :
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
            <span>prénom </span>
          </li>
          <li>
            <span>adresse mail</span>
          </li>
          <li>
            <span>adresse postale</span>
          </li>
          <li>
            <span>numéro de téléphone</span>
          </li>
        </ul>
        <h3>
          <span>Mesures de protection des données</span>
        </h3>
        <p>
          <span>
            Les données personnelles sont protégées par
            les moyens suivants :
          </span>
        </p>
        <ul>
          <li>
            <span>
              Les échanges avec le site Candilb sont
              sécurisés par le protocole https
            </span>
          </li>
          <li>
            <span>
              Le service est hébergé sur les serveurs du
              Ministère de l&rsquo;intérieur
            </span>
          </li>
        </ul>
        <h3>
          <span>Gestion des données</span>
        </h3>
        <p>
          <span>
            Les données sont conservées pour une durée de
            1 an maximum et sont ensuite effacées.
          </span>
        </p>
        <p>
          <span>
            Les données sont effacées avant l&#39;expiration du
            délai de 1 an,{' '}
          </span>
          <span>
            si la validité du code de la route arrive à terme
            et/ou si l&#39;examen pratique du permis de conduire est
            réussi.
          </span>
        </p>
        <h3>
          <span>Droit d&#39;accès</span>
        </h3>
        <p>
          <span>
            Vous bénéficiez d&#39;un droit d&#39;accès
            à vos données, de rectification ou
            d&rsquo;effacement de celles-ci, d&rsquo;un droit à la
            limitation de leur traitement, de portabilité et de retirer
            votre consentement à tout moment.
          </span>
        </p>
        <p>
          <span>Pour ce faire, vous pouvez vous adresser à la </span>
          <span>
            Délégation à la sécurité
            routière, Place Beauvau - 75800 PARIS CEDEX 08
          </span>
          <span>&nbsp;ou par mail : </span>
          <span>
            <a href="mailto:candilib@interieur.gouv.fr">
              candilib@interieur.gouv.fr
            </a>
          </span>
          <span>
            , en joignant un titre d&rsquo;identité afin de pouvoir
            traiter votre demande.
          </span>
        </p>
        <p>
          <span>
            Vous avez la possibilité d&rsquo;introduire une
            réclamation auprès d&rsquo;une autorité de
            contr&ocirc;le.
          </span>
        </p>
      </div>
    </CardContent>
  </Card>
);

GeneralCondiions.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(jssStyles)(GeneralCondiions);
