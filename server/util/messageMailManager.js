import {
  CANDIDAT_NOK,
  CANDIDAT_NOK_NOM,
  EPREUVE_PRATIQUE_OK,
  EPREUVE_ETG_KO,
  INSCRIPTION_OK,
  INSCRIPTION_VALID,
  AURIGE_OK,
} from './constant';

const mailMessage = (candidatAurige, flag) => {
  const {
    codeNeph,
    nomNaissance,
    email,
  } = candidatAurige;

  let message = {};

  const nomMaj = nomNaissance ? nomNaissance.toUpperCase() : '';

  const INSCRIPTION_OK_MSG = `<p>Bonjour Mr/Mme ${nomMaj},</p>
  <br>
  <p>Bienvenue sur Candilib !</p>
  <br>
  <p>Vous êtes à présent inscrit sur le site de réservation de l'examen pratique du permis de conduire.</p>
  <p><b>Conservez précieusement ce mail qui vous permettra de vous connecter si le site Candilib</b></p>
  <p>Votre identifiant de connexion est l'adresse mail que vous nous avez fournie lors de votre inscription : ${candidatAurige.email}</p>`;

  const INSCRIPTION_KO_MSG = `<p>Bonjour Mr/Mme ${nomMaj},</p>
  <br>
  <p>Vous avez demandé à rejoindre le site de réservation des candidats libres. Malheureusement les informations que vous avez fournies sont erronées :</p>
  <p align="center">NEPH ${codeNeph} / NOM ${nomMaj}</p>
  <p>Merci de les vérifier avant de renouveler votre demande d’inscription. Si vos informations étaient corectes, nous vous invitons à consulter notre aide en ligne:<p>
  <p>Url FAQ site</p>
  <br>
  <p align="right">L'équipe Candilib</p>`;

  const EPREUVE_PRATIQUE_OK_MSG = `<p>Bonjour Mr/Mme ${nomMaj},</p>
  <br>
  <p>Selon nos informations vous avez déjà réussi votre examen du permis de conduire, notre service ne vous est plus utile.</p>
  <br>
  <p><b>Attention :</b></p>
  <p>Si vous recevez ce message et que vous êtes en situation de retour au permis de conduire après une annulation, vous ne pouvez pas rejoindre le site de réservation des candidats libres sans examen du code de la route réussi et en cours de validité.</p>
  <p>Vous pourrez trouver des informations utiles en consultant notre aide en ligne:<p>
  <p>Url FAQ site</p>
  <br>
  <p align="right">L'équipe Candilib</p>`;

  const EPREUVE_ETG_KO_MSG = `<p>Bonjour Mr/Mme ${nomMaj},</p>
  <br>
  <p>Votre code de la route n’est pas/plus valide.</p>
  </p>Vous ne pouvez pas rejoindre le site de réservation des candidats libres sans examen du code de la route réussi et en cours de validité.</p>
  <p>Vous pourrez trouver des informations utiles en consultant notre aide en ligne:<p>
  <p>Url FAQ site</p>
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
      message.subject = "<ne pas répondre> Problème inscription Candilib";
      return message;
    case INSCRIPTION_VALID:
      message.content = INSCRIPTION_VALID_MSG;
      message.subject = "<ne pas répondre> Confirmation d'inscription Candilib";
      return message;
    case CANDIDAT_NOK_NOM:
      message.content = INSCRIPTION_KO_MSG;
      message.subject = "<ne pas répondre> Problème inscription Candilib";
      return message;
    case EPREUVE_PRATIQUE_OK:
      message.content = EPREUVE_PRATIQUE_OK_MSG;
      message.subject = "<ne pas répondre> Problème inscription Candilib";
      return message;
    case INSCRIPTION_OK:
      message.content = INSCRIPTION_VALID_MSG;
      message.subject = "<ne pas répondre> Confirmation d'inscription Candilib";
      return message;
    case EPREUVE_ETG_KO:
      message.content = EPREUVE_ETG_KO_MSG;
      message.subject = "<ne pas répondre> Problème inscription Candilib";
      return message;
    case AURIGE_OK:
      message.content = INSCRIPTION_OK_MSG;
      message.subject = "<ne pas répondre> Validation de votre inscription à Candilib";
      return message;
    default:
      return '';
  }
};

export default mailMessage;
