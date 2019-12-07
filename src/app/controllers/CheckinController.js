import { subDays, setHours, setMinutes, setSeconds, format } from 'date-fns';
import Checkin from '../schemas/Checkin';

class CheckinController {
  async index(req, res) {
    // TODO check if must be search students exists in database ?
    const checkins = await Checkin.find({
      student_id: req.params.id,
    })
      // .sort({ createdAt: 'desc' })
      .limit(5);
    return res.json(checkins);
  }

  async store(req, res) {
    const now = new Date();

    const end_date = setSeconds(setMinutes(setHours(now, 23), 59), 59);
    const start_date = setSeconds(
      setMinutes(setHours(subDays(end_date, 7), 0), 0),
      0
    );

    // const start = format(start_date, 'yyyy-MM-dd HH:mm:ss');
    // const end = format(end_date, 'yyyy-MM-dd HH:mm:ss');
    // return res.json({ start, end });

    /**
     *  Check quantity check in user at last 7 days
     */
    const checkinsCounter = await Checkin.count({
      student_id: req.params.id,
    })
      .gte('createdAt', start_date)
      .lte('createdAt', end_date);

    if (checkinsCounter >= 5)
      return res.status(400).json({
        error: 'You have reached the maximum check in limit of the week',
      });

    const checkin = await Checkin.create({
      student_id: req.params.id,
    });

    return res.status(201).json(checkin);
  }
}

export default new CheckinController();
