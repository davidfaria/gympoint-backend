import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class AnswerHelpOrderMail {
  get key() {
    return 'AnswerHelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrder } = data;

    await Mail.sendMail({
      to: `${helpOrder.student.name} <${helpOrder.student.email}>`,
      subject: '[GYMPOINT - RESPONDE] - Gympoint',
      template: 'answer-help-order',
      context: {
        student: helpOrder.student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answer_at: format(parseISO(helpOrder.answer_at), 'dd/MMMM/yyyy HH:mm', {
          locale: pt,
        }),
        createdAt: format(parseISO(helpOrder.createdAt), 'dd/MMMM/yyyy HH:mm', {
          locale: pt,
        }),
        total: helpOrder.price,
      },
    });
  }
}

export default new AnswerHelpOrderMail();
