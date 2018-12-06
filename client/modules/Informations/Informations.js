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
          <p className={styles.informationsDate}>modifié le 06/12/2018</p>
          <h2>Qu'est-ce que CandiLib</h2>

          <p>
            CandilLib est une expérimentation d'un nouveau service de
            réservation en ligne des places d'examen pratique du permis de
            conduire pour des candidats libres domiciliés en Seine-Saint-Denis.
          </p>

          <h2>Qu'est-ce qu'un candidat libre ?</h2>

          <p>
            Est défini réglementairement comme "candidat libre" tout candidat
            qui n'est pas présenté sur les droits à places d'une école de
            conduite et qui fait l'objet d'une convocation nominative de la part
            de l'administration.
          </p>

          <p>
            Source réglementaire :{' '}
            <a href="https://www.legifrance.gouv.fr/affichTexteArticle.do?idArticle=LEGIARTI000032966489&cidTexte=LEGITEXT000029705598&dateTexte=20181205">
              https://www.legifrance.gouv.fr/affichTexteArticle.do?idArticle=LEGIARTI000032966489&cidTexte=LEGITEXT000029705598&dateTexte=20181205
            </a>
          </p>

          <h2>Qui peut utiliser le service ?</h2>

          <p>
            Les "candidats libres" résidant dans le 93 qui ont reçu un mail
            d'invitation pour participer à l'expérimentation.
          </p>

          <h2>Comment ça marche ?</h2>

          <p>
            Vous avez reçu une invitation nominative par mail par le service des
            examens de la Seine-Saint-Denis à vous inscrire sur Candilib.
          </p>

          <h3>Pour s'inscrire :</h3>
          <ul>
            <li>Rendez vous sur la page d'accueil du service</li>
            <li>
              Déposez une demande d'inscription à Candilib en saisissant vos n°
              NEPH (le numéro que vous avez reçu pour l'inscription au permis),
              Nom, prénom, mail, téléphone et adresse postale.
            </li>
          </ul>

          <h3>Pour réserver :</h3>
          <ul>
            <li>
              Connectez vous à Candilib après réception du mail "Validation de
              votre inscription à Candilib" (lien de connexion dans le mail de
              validation).
            </li>
            <li>
              {' '}
              Sur le planning, sélectionnez le créneau disponible à la date et
              au centre d'examen qui vous conviennent (si besoin, déplacez-vous
              sur les vues "mois", "semaine" et " jour").
            </li>
            <li> Confirmez votre réservation.</li>
          </ul>
          <h2>Est-ce que je peux modifier ou annuler mon rendez-vous ?</h2>
          <ul>
            <li>
              Vous pouvez modifier votre rendez-vous en sélectionnant un nouveau
              créneau 7 jours avant la date prévue.
            </li>
            <li>Vous pouvez annuler librement 7 jours avant la date prévue.</li>
            <li>
              Si vous devez annuler moins de 7 jours avant la date, vous serez
              placé en liste d'attente non prioritaire.
            </li>
          </ul>
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
            <li>
              Votre accompagnateur sera :
              <ul>
                <li>
                  soit un enseignant de la conduite en possession de son
                  autorisation d'enseigner pour la présenter à l'inspecteur,
                </li>
                <li>
                  soit une personne dont le permis B est en cours de validité.
                  Cette dernière devra remplir et signer la « charte de
                  l’accompagnateur » (
                  <a href="https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000036251681">
                    https://www.legifrance.gouv.fr/jo_pdf.do?id=JORFTEXT000036251681
                  </a>
                  ) pour la remettre à l’inspecteur avant le début de l’examen.
                </li>
              </ul>
            </li>
            <li>
              Vous présenterez un titre d’identité en cours de validité : carte
              nationale d’identité, passeport ou titre de séjour (liste complète
              :{' '}
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
            <li>Une enveloppe affranchie à 20 g.</li>
            <li>
              Lorsque vous avez fait l'objet d'une annulation du permis, le
              récépissé de la « fiche retour au permis de conduire » que vous
              aurez imprimé sur le site de l’ ANTS :{' '}
              <a href="https://permisdeconduire.ants.gouv.fr/">
                https://permisdeconduire.ants.gouv.fr/
              </a>
              .
            </li>
          </ul>
          <p>
            <strong>Attention</strong> : le mauvais état du véhicule (pneus
            lisses, rétros cassés ou absents, non fonctionnement de tous les
            feux, etc.), ou l'absence ou la non-validité d'un des documents
            exigés ci-dessus, pour le candidat ou pour l'accompagnateur,
            entraîne le report de l'examen à une date ultérieure.
          </p>
          <h2>Je ne trouve pas de place disponible</h2>
          <p>De nouveaux créneaux sont ajoutés chaque mois.</p>
          <h2>Je n'habite pas dans le 93</h2>
          <p>
            Ce service est restreint aux candidats domiciliés en
            Seine-Saint-Denis qui ont reçu un mail d'invitation à participer à
            cette expérimentation. Si vous n'habitez dans le 93, rapprochez-vous
            du Bureau de l'éducation routière du département de votre domicile.
          </p>
        </div>
      </CardContent>
    </Paper>
  </Card>
);
export default Informations;
