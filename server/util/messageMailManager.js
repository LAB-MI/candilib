import moment from 'moment';
import {
  CANDIDAT_NOK,
  CANDIDAT_NOK_NOM,
  EPREUVE_PRATIQUE_OK,
  EPREUVE_ETG_KO,
  INSCRIPTION_OK,
  INSCRIPTION_VALID,
  INSCRIPTION_UPDATE,
  AURIGE_OK,
  MAIL_CONVOCATION,
  ANNULATION_CONVOCATION,
} from './constant';
import sites from '../inbox/sites.json';
import serverConfig from '../config';
import Downshift from 'downshift';

const mailMessage = (candidatAurige, flag) => {
  const urlFAQ = `${serverConfig.host}:${serverConfig.portMail}/informations`;
  const urlRESA = `${serverConfig.host}:${serverConfig.portMail}/auth?redirect=calendar`;
  const { codeNeph, nomNaissance, creneau } = candidatAurige;

  const message = {};

  const nomMaj = nomNaissance ? nomNaissance.toUpperCase() : '';

  const site = creneau && creneau.title ? creneau.title : '';
  const dateCreneau = creneau && creneau.start
    ? moment(creneau.start).format('DD MMMM YYYY')
    : '';
  const heureCreneau = creneau && creneau.start
    ? moment(creneau.start).format('HH:mm') : '';

  let siteAdresse = [];

  if (creneau && creneau.title) {
    siteAdresse = sites.find(item => item.nom.toUpperCase() === creneau.title);
  }

  const ANNULATION_CONVOCATION_MSG = `<p>Bonjour Mr/Mme ${nomMaj},</p>
  <br>
  <p>votre réservation à l'examen pratique du permis de conduire avec
  le numéro NEPH ${codeNeph} est bien annulée. </p>
  <br>
  <p align="right">L'équipe Candilib</p>`;

  const MAIL_CONVOCATION_MSG = `
  <p>Le présent mail vaut convocation.</p>
  <p>Bonjour Mr/Mme ${nomMaj},</p>
  <br>
  <p>Nous avons bien pris en compte votre réservation à l'examen pratique
  du permis de conduire à ${site} le ${dateCreneau} à ${heureCreneau} avec
   le numéro NEPH ${codeNeph}.</p>
  <p>${siteAdresse.adresse} </p>
  <br>
  <p>Nous vous rappelons les éléments à vérifier le jour de l'examen :</p>
  <div>
    <ul>
      <li>Vous fournirez un véhicule en parfait état, équipé d’une double
      commande de frein et d’embrayage, de 2 rétroviseurs intérieurs et
      de 2 rétroviseurs latéraux.
      </li>
      <li>
        <p>Votre accompagnateur sera :<p>
          <ul>
            <li>
              soit un enseignant de la conduite en possession de l'original de son
              autorisation d'enseigner pour la présenter à l'inspecteur,
            </li>
            <li>
              soit une personne dont le permis B est en cours de validité.
              Cette dernière devra présenter son permis ainsi que
              la « charte de l’accompagnateur »
              (<a href='https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000036251681'>https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000036251681</a>) remplie et signée
              pour la remettre à l’inspecteur avant le début de l’examen.
            </li>
            <li>
              <p>
                Vous présenterez un titre d’identité en cours de validité : carte nationale
                d’identité, passeport ou titre de séjour
                (liste complète <a href='https://legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000033736411&categorieLien=id'>https://legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000033736411&categorieLien=id</a>).
              <p>
            </li>
            <li>
              <p>Votre permis de conduire original si vous avez obtenu une autre
              catégorie depuis moins de 5 ans afin de bénéficier d’une dispense
              d’examen théorique général.</p>
            </li>
            <li>
              L'attestation d'assurance du véhicule, en cours de validité,
              comportant obligatoirement les mentions suivantes :
              <uL>
                <li>la raison sociale de la société d'assurance ;</li>
                <li>les nom et prénom du candidat bénéficiant de la police d'assurance ;</li>
                <li>le numéro d'immatriculation du véhicule couvert ;</li>
                <li>le type d'assurance (couverture de l'ensemble des dommages
                pouvant être causés aux tiers à l'occasion de l'examen)</li>
              </ul>
            </li>
          </ul>
      </li>
      <li>
        Une enveloppe affranchie à 20 g.
      </li>
      <li>
        Lorsque vous avez fait l'objet d'une annulation du permis, le récépissé
        de la « fiche retour au permis de conduire » que vous aurez imprimé
        sur le site de l’ ANTS :
        <a href='https://permisdeconduire.ants.gouv.fr/'>https://permisdeconduire.ants.gouv.fr/</a>.
      </li>
    </ul>
  </div>
  <p><b>Attention :</b></p>
  <p>
    Le mauvais état du véhicule (pneus lisses, rétros cassés ou
    absents, non fonctionnement de tous les feux, etc.),
    ou l'absence ou la non-validité d'un des documents exigés ci-dessus,
    pour le candidat ou pour l'accompagnateur, entraîne le report de l'examen
    À une date ultérieure.
    <br/>
  </p>
  <p>
    Si besoin, vous pouvez annuler votre réservation sur <a href=${urlRESA}>Ma réservation</a>.
    Si vous annulez 7 jours avant la date prévue, vous pourrez choisir un autre créneau disponible.
    Nous vous souhaitons une bonne préparation et le succès à l'examen.
    Pour toute information, vous pouvez consulter notre aide en ligne : <a href=${urlFAQ}>Informations</a>.
  </p>
  <p>
    Sincères salutations,
  </p>
  <p>Candilib</p>
  `;

  const INSCRIPTION_OK_MSG = `<p>Bonjour Mr/Mme ${nomMaj},</p>
  <br>
  <p>Bienvenue sur Candilib !</p>
  <br>
  <p>Vous êtes à présent inscrit sur le site de réservation de l'examen pratique du permis de conduire.</p>
  <p><b>Conservez précieusement ce mail qui vous permettra de vous connecter sur le site Candilib</b></p>
  <p>Votre identifiant de connexion est l'adresse mail que vous nous avez fournie lors de votre inscription :
  ${candidatAurige.email}
  </p>`;

  const INSCRIPTION_KO_MSG = `<p>Bonjour Mr/Mme ${nomMaj},</p>
  <br>
  <p>
    Vous avez demandé à rejoindre le site de réservation des candidats libres. Malheureusement les informations
    que vous avez fournies sont erronées :
  </p>
  <p align="center">NEPH ${codeNeph} / NOM ${nomMaj}</p>
  <p>Merci de les vérifier avant de renouveler votre demande d’inscription.</p>
  <br>
  <p>Veuillez consulter notre aide en ligne :<p>
  <p><a href=${urlFAQ}>Informations</a></p>
  <br>
  <p align="right">L'équipe Candilib</p>`;

  const EPREUVE_PRATIQUE_OK_MSG = `<p>Bonjour Mr/Mme ${nomMaj},</p>
  <br>
  <p>Selon nos informations vous avez déjà réussi votre examen du permis de conduire, notre service ne vous est plus utile.</p>
  <br>
  <p><b>Attention :</b></p>
  <p>
    Si vous recevez ce message et que vous êtes en situation de retour au permis de conduire après une annulation,
    vous ne pouvez pas rejoindre le site de réservation des candidats libres sans examen du code de la route réussi
    et en cours de validité.
  </p>
  <p>Vous pourrez trouver des informations utiles en consultant notre aide en ligne:<p>
  <p><a href=${urlFAQ}>Informations</a></p>
  <br>
  <p align="right">L'équipe Candilib</p>`;

  const EPREUVE_ETG_KO_MSG = `<p>Bonjour Mr/Mme ${nomMaj},</p>
  <br>
  <p>Votre code de la route n’est pas/plus valide.</p>
  </p>Vous ne pouvez pas rejoindre le site de réservation des candidats libres sans examen du code de la route réussi et en cours de validité.</p>
  <p>Vous pourrez trouver des informations utiles en consultant notre aide en ligne:<p>
  <p><a href=${urlFAQ}>Informations</a></p>
  <br>
  <p align="right">L'équipe Candilib</p>`;

  const INSCRIPTION_VALID_MSG = `<p>Bonjour Mr/Mme ${nomMaj},</p>
  <p>Votre demande d’inscription est en cours de vérification,
  vous recevrez une information sous 48h hors week-end et jours fériés.</p>
  <br>
  <p align="right">L'équipe Candilib</p>`;

  switch (flag) {
  case CANDIDAT_NOK:
    message.content = INSCRIPTION_KO_MSG;
    message.subject = '<ne pas répondre> Inscription Candilib non validée';
    return message;
  case INSCRIPTION_VALID:
    message.content = INSCRIPTION_VALID_MSG;
    message.subject = "<ne pas répondre> Confirmation d'inscription Candilib";
    return message;
  case CANDIDAT_NOK_NOM:
    message.content = INSCRIPTION_KO_MSG;
    message.subject = '<ne pas répondre> Inscription Candilib non validée';
    return message;
  case EPREUVE_PRATIQUE_OK:
    message.content = EPREUVE_PRATIQUE_OK_MSG;
    message.subject = '<ne pas répondre> Problème inscription Candilib';
    return message;
  case INSCRIPTION_OK:
    message.content = INSCRIPTION_VALID_MSG;
    message.subject = '<ne pas répondre> Inscription Candilib en attente de vérification';
    return message;
  case EPREUVE_ETG_KO:
    message.content = EPREUVE_ETG_KO_MSG;
    message.subject = '<ne pas répondre> Problème inscription Candilib';
    return message;
  case AURIGE_OK:
    message.content = INSCRIPTION_OK_MSG;
    message.subject = '<ne pas répondre> Validation de votre inscription à Candilib';
    return message;
  case MAIL_CONVOCATION:
    message.content = MAIL_CONVOCATION_MSG;
    message.subject = "<ne pas répondre> Convocation à l'examen";
    return message;
  case ANNULATION_CONVOCATION:
    message.content = ANNULATION_CONVOCATION_MSG;
    message.subject = "<ne pas répondre> Annulation de Convocation à l'examen";
    return message;
  case INSCRIPTION_UPDATE:
    message.content = INSCRIPTION_VALID_MSG;
    message.subject = '<ne pas répondre> Inscription Candilib en attente de vérification';
    return message;
  default:
    return '';
  }
};

export default mailMessage;
