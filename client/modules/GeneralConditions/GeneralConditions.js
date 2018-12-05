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
          <h1>Mentions Légales</h1>
          <p className={styles.date_modified}>2018-12-05</p>
          <h2>Informations éditeurs</h2>
          <p>
            Ce site est géré par la Délégation à la sécurité routière (DSR)
            Place Beauvau - 75800 PARIS CEDEX 08 Tél. : 01 49 27 49 27
          </p>

          <h2>Directeur de la publication</h2>
          <p>
            Emmanuel Barbe, délégué interministériel à la Sécurité routière{' '}
          </p>
          <h2>Gestion des données personnelles</h2>
          <p>
            Les informations que vous communiquez sur ce site sont nécessaires à
            la Délégation à la Sécurité routière qui est responsable de leur
            traitement.
          </p>

          <p>
            Ces données sont conservées pour une durée de 1 an maximum et sont
            ensuite effacées.
            <br />
            Ces données sont effacées avant l'expiration du délai de 1 an, si la
            validité du code de la route arrive à terme et/ou si l'examen
            pratique du permis de conduire est réussi.
          </p>
          <p>
            Vous bénéficiez d'un droit d'accès à vos données, de rectification
            ou d’effacement de celles-ci, d’un droit à la limitation de leur
            traitement, de portabilité et de retirer votre consentement à tout
            moment.
          </p>
          <p>
            Pour ce faire, vous pouvez vous adresser à la{' '}
            <strong>
              Délégation à la sécurité routière, Place Beauvau - 75800 PARIS
              CEDEX 08
            </strong>{' '}
            ou par mail :{' '}
            <a href="mailto:candilib@interieur.gouv.fr">
              candilib@interieur.gouv.fr
            </a>
            , en joignant un titre d’identité afin de pouvoir traiter votre
            demande.
          </p>
          <p>
            Vous avez la possibilité d’introduire une réclamation auprès d’une
            autorité de contrôle.
          </p>
        </div>
      </CardContent>
    </Paper>
  </Card>
);
export default GeneralCondiions;
