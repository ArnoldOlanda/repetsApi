import passport, { Strategy } from 'passport';

type TypeStrategy<T, U, V> = { new (params: U, callback: V): T };

export function passportUse<T extends Strategy, U, V>(
  name: string,
  Strategy: TypeStrategy<T, U, V>,
  params: U,
  callback: V
) {
  passport.use(name, new Strategy(params, callback));
}
