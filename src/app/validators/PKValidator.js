import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    id: Yup.number().required(),
  });

  if (!(await schema.isValid(req.params)))
    return res.status(400).json({ error: 'Validation fails' });

  return next();
};
