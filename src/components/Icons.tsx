// components/Icon.js

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faPlug } from '@fortawesome/free-solid-svg-icons';

export const CoffeeIcon = () => <FontAwesomeIcon icon={faCoffee} />;
export const TwitterIcon = () => <FontAwesomeIcon icon={faTwitter} />;
export const PlugIcon = () => <FontAwesomeIcon icon={faPlug} />;
