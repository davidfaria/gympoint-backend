import * as Yup from 'yup';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    student_id: Yup.number().required(),
    plan_id: Yup.number().required(),
    start_date: Yup.date().required(),
  });

  if (!(await schema.isValid(req.body)))
    return res.status(400).json({ error: 'Validation fails' });

  return next();
};
