import { Envs } from 'src/common/constants';

export const EnvConfiguration = () => ({
  nodeEnv: process.env.NODE_ENV || 'dev',
  stage: process.env.STAGE || 'dev',

  [Envs.PORT]: process.env.PORT || 3000,
  [Envs.JWT_SECRET]: process.env.JWT_SECRET,
});
