import { addMonths, parseISO } from 'date-fns';

import Queue from '../../lib/Queue';
import EnrollmentMail from '../jobs/EnrollmentMail';

import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'total'],
        },
      ],
    });
    return res.json(enrollments);
  }

  async store(req, res) {
    const plan = await Plan.findByPk(req.body.plan_id);

    if (!plan) return res.status(400).json({ error: 'Plan not found' });

    const end_date = addMonths(parseISO(req.body.start_date), plan.duration);

    const enrollmentCreated = await Enrollment.create(
      {
        ...req.body,
        end_date,
        price: plan.total,
      }

      // TODO - Study documentation https://sequelize.org/master/manual/associations.html#creating-with-associations
      // {
      //   include: [
      //     {
      //       model: Student,
      //       as: 'student',
      //       attributes: ['id', 'name'],
      //     },
      //     {
      //       model: Plan,
      //       as: 'plan',
      //       attributes: ['id', 'title', 'total'],
      //     },
      //   ],
      // }
    );

    const enrollment = await enrollmentCreated.reload({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price', 'total'],
        },
      ],
    });

    /**
     *  Send email with details of enrollment
     */

    await Queue.add(EnrollmentMail.key, { enrollment });

    return res.status(201).json(enrollment);
  }

  async update(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment)
      return res.status(400).json({ error: 'Enrollment not found' });

    const plan = await Plan.findByPk(req.body.plan_id);
    if (!plan) return res.status(400).json({ error: 'Plan not found' });

    const end_date = addMonths(parseISO(req.body.start_date), plan.duration);

    await enrollment.update({ ...req.body, end_date, price: plan.total });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment)
      return res.status(400).json({ error: 'Enrollment not found' });

    await enrollment.destroy();
    return res.json({ message: 'Enrollment successfully removed' });
  }
}

export default new EnrollmentController();
