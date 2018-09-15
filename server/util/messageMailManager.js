import {
  CANDIDAT_NOK,
  CANDIDATS_NOK_NOM,
  EPREUVE_PRATIQUE_OK,
  EPREUVE_ETG_KO,
  INSCRIPTION_OK,
  INSCRIPTION_VALID,
} from './constant';


const mailMessage = (candidatAurige, flag) => {
  const {
    codeNeph,
    nomNaissance,
  } = candidatAurige;

  const INSCRIPTION_KO_MSG = `Bonjour, vous avez demandé à rejoindre le site de réservation des candidats libres.
    Malheureusement les informations que vous avez fournies sont erronées: \n\r
    NEPH ${codeNeph} / NOM ${nomNaissance} \r\n
    Merci de les vérifier avant de renouveler une demande d’inscription.\n\r
    Veuillez consulter notre aide en ligne:
    Url FAQ site\n
    Candilib`;

  const EPREUVE_PRATIQUE_OK_MSG = `Bonjour, vous avez demandé à rejoindre le site de réservation des candidats libres.
    Malheureusement vous avez déja votre permis : \n\r
    NEPH ${codeNeph} / NOM ${nomNaissance} \r\n
    Si vous ètes dans le cadre d'un annulation, veuillez d'abord passer le ETG
    Candilib`;

  const EPREUVE_ETG_KO_MSG = `Bonjour, votre code de la route n’est pas/plus valide. 
    Vous ne pouvez pas rejoindre le site de réservation des candidats libres sans examen du code de la route réussi et en cours de validité. 
    Veuillez consulter notre aide en ligne:
    Url FAQ site
    Candilib`;


  const INSCRIPTION_VALID_MSG = `Mr/Mme ${nomNaissance} Votre demande d’inscription est en cours de vérification, 
  vous recevrez une information sous 48h hors week-end et jours fériés.\n` +
    'Candilib';

  switch (flag) {
    case CANDIDAT_NOK:
      return INSCRIPTION_KO_MSG;
    case INSCRIPTION_VALID:
      return INSCRIPTION_VALID_MSG;
    case CANDIDATS_NOK_NOM:
      return INSCRIPTION_KO_MSG;
    case EPREUVE_PRATIQUE_OK:
      return EPREUVE_PRATIQUE_OK_MSG;
    case INSCRIPTION_OK:
      return INSCRIPTION_VALID_MSG;
    case EPREUVE_ETG_KO:
      return EPREUVE_ETG_KO_MSG;
    default:
      return '';
  }
};
export default mailMessage;
