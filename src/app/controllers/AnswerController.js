import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Queue from '../../lib/Queue';
import AnswerHelpOrderMail from '../jobs/AnswerHelpOrderMail';

class AnswerController {
  async index(req, res) {
    // const { page = 1, perPage = 10 } = req.query;

    const page = parseInt(req.query.page || 1, 10);
    const perPage = parseInt(req.query.perPage || 5, 10);

    const helporders = await HelpOrder.findAndCountAll({
      where: { answer_at: null },
      order: ['createdAt'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    const totalPage = Math.ceil(helporders.count / perPage);

    return res.json({
      page,
      perPage,
      data: helporders.rows,
      total: helporders.count,
      totalPage,
    });
  }

  async store(req, res) {
    const helpOrderUpdated = await HelpOrder.findByPk(req.params.id);

    if (!helpOrderUpdated)
      return res.status(400).json({ error: 'Help Order not found' });

    helpOrderUpdated.answer = req.body.answer;
    helpOrderUpdated.answer_at = new Date();

    await helpOrderUpdated.save();

    const helpOrder = await helpOrderUpdated.reload({
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    /**
     *  Send email with details of enrollment
     */

    await Queue.add(AnswerHelpOrderMail.key, { helpOrder });

    return res.status(201).json(helpOrder);
  }
}

export default new AnswerController();
