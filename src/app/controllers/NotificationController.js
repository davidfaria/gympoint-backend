import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class NotificationController {
  async index(req, res) {
    const helporders = await HelpOrder.findAll({
      where: { answer_at: null },
      order: ['createdAt'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(helporders);
  }
}

export default new NotificationController();
