import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    title: Yup.string(),
    duration: Yup.number(),
    price: Yup.number(),
  });

  if (!(await schema.isValid(req.body)))
    return res.status(400).json({ error: 'Validation fails' });

  return next();
};
