import React from 'react';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';

import styles from './Faq.css';
import { CardContent } from '@material-ui/core';

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
const Informations = () => (
  <Card className={classes.card}>
    <Paper className={classes.paper}>
      <CardContent>
        <div className={styles.informations}>
          <h1>Foire Aux Questions</h1>
          <p>2018-06-20</p>
          <h2>Qu'est-ce que CandiLib 93</h2>
          <p>
            CandilLib 93 est le nouveau service de réservation en ligne des
            places d'examen pratique du permis de conduire pour les candidats
            libres domiciliés en Seine-Saint-Denis.
          </p>
          <h2>Qu'est-ce qu'un candidat libre ?</h2>
          <p>
            Est défini réglementairement comme "candidat libre" tout candidat
            qui n'est pas présenté sur les droits à places d'une école de
            conduite et qui fait l'objet d'une convocation nominative de la part
            de l'administration.
          </p>
          <p>
            Source réglementaire
            <a href="https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000029701643&dateTexte=20180625">
              ici
            </a>
          </p>
          <h2>Qui peut utiliser le service ?</h2>
          <p>Tous les "candidats libres" résidant dans le 93.</p>
          <h2>Comment ça marche ?</h2>
          <p>
            Vous avez reçu une invitation nominative par mail par le service des
            examens de la Seine-Saint-Denis à vous inscrire sur Candilib.
          </p>
          <p>
            <ol type="1">
              <li>Cliquez sur le bouton réserver en page d'accueil.</li>

              <li>Choisissez le centre d'examen.</li>

              <li>
                Sur le planning, sélectionnez une date, puis le créneau
                disponible qui vous convient. (Si besoin déplacez-vous sur
                d'autres mois).
              </li>

              <li>
                Sur la page d'inscription, créez votre compte Candilib en
                saisissant votre Nom, mail, téléphone, prénom, date de naissance
                et n° NEPH (le numéro que vous avez reçu pour l'inscription au
                permis).
              </li>

              <li>Confirmez la réservation.</li>
            </ol>
          </p>
          <h2>Est-ce que je peux modifier/ annuler mon rendez-vous ?</h2>
          <p>Vous pouvez annuler librement 7 jours avant la date prévue.</p>
          <p>
            Pour modifier un rendez-vous avant 7 jours, annuler le rendez-vous,
            vous pourrez choisir un autre créneau disponible immédiatement.
          </p>
          Si vous devez annuler moins de 7 jours avant la date, vous serez placé
          en liste d'attente non prioritaire.
          <p>
            Merci de nous prévenir en cas d'empêchement afin de libérer le
            créneau pour un autre candidat.
          </p>
          <h2>Quels sont les pré-requis le jour de l'examen ?</h2>
          <p>
            Nous vous rappelons les éléments à vérifier le jour de l'examen :
          </p>
          <ul>
            <li>
              Vous fournirez un véhicule en parfait état, équipé d’une double
              commande de frein et d’embrayage, de 2 rétroviseurs intérieurs et
              de 2 rétroviseurs latéraux.
            </li>
            <li> Votre accompagnateur sera :</li>
            <li>
              soit un enseignant de la conduite en possession de son
              autorisation d'enseigner pour la présenter à l'inspecteur,
            </li>
            <li>
              soit une personne dont le permis B est en cours de validité. Cette
              dernière devra remplir et signer la « charte de l’accompagnateur »
              (
              <a href="https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000036251681">
                https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000036251681
              </a>
              ) pour la remettre à l’inspecteur avant le début de l’examen.
            </li>
            <li>
              Vous présenterez un titre d’identité en cours de validité : carte
              nationale d’identité, passeport ou titre de séjour (liste complète
              :
              <a href="https://legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000033736411&categorieLien=id">
                https://legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000033736411&categorieLien=id
              </a>
              ).
            </li>
            <li>
              Votre permis de conduire original si vous avez obtenu une autre
              catégorie depuis moins de 5 ans afin de bénéficier d’une dispense
              d’examen théorique général.
            </li>
            <li>
              L'attestation d'assurance du véhicule, en cours de validité, à
              votre nom.
            </li>
            <li> Une enveloppe affranchie à 20 g.</li>
            <li>
              Lorsque vous avez fait l'objet d'une annulation du permis, le
              récépissé de la « fiche retour au permis de conduire » que vous
              aurez imprimé sur le site de l’ ANTS :
              <a href="https://permisdeconduire.ants.gouv.fr/">
                https://permisdeconduire.ants.gouv.fr/
              </a>
              .
            </li>
          </ul>
          <p>
            Attention : le mauvais état du véhicule (pneus lisses, rétros cassés
            ou absents, non fonctionnement de tous les feux, etc.), ou l'absence
            ou la non-validité d'un des documents exigés ci-dessus, pour le
            candidat ou pour l'accompagnateur, entraîne le report de l'examen à
            une date ultérieure.
          </p>
          <h2>Je ne trouve pas de place disponible</h2>
          <p>De nouveaux créneaux sont ajoutés chaque mois.</p>
          <h2>Je n'habite pas dans le 93</h2>
          <p>
            Ce service est restreint aux candidats domiciliés en
            Seine-Saint-Denis.
          </p>
          <p>
            Si vous n'habitez dans le 93, rapprochez-vous du Bureau de
            l'éducation routière du département de votre domicile.
          </p>
          <h2>Qui sommes-nous ?</h2>
          <p>
            Nous sommes le Service des places d'examen de l'Unité Territoriale
            de Seine-Saint-Denis.
          </p>
          <p>
            Vous pouvez nous contacter par mail :
            <a href="mailto:candilib@interieur.gouv.fr">
              candilib@interieur.gouv.fr
            </a>
          </p>
        </div>
      </CardContent>
    </Paper>
  </Card>
);
export default Informations;
