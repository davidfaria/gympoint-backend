import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    title: Yup.string().required(),
    duration: Yup.number().required(),
    price: Yup.number().required(),
  });

  if (!(await schema.isValid(req.body)))
    return res.status(400).json({ error: 'Validation fails' });

  return next();
};
