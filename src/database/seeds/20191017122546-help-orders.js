module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'help_orders',
      [
        {
          student_id: 1,
          question: 'COM QUE RITMO É PRECISO TREINAR PARA TER RESULTADOS?',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 2,
          question: 'QUAL É O ERRO MAIS COMUM A NÃO COMETER NA ACADEMIA?',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 3,
          question: 'QUE EXERCÍCIO ABDOMINAL DEVO FAZER PARA PERDER BARRIGA?',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 4,
          question:
            'EU NUNCA SEI COMO RESPIRAR CORRETAMENTE DURANTE O EXERCÍCIO ... QUAL O MÉTODO CORRETO?',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 5,
          question: 'CONSIGO EMAGRECER CAMINHANDO?',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          student_id: 1,
          question: 'POR QUE FICAMOS MAIS CANSADOS NO VERÃO?',
          answer:
            'O CALOR DIMINUI A PRESSÃO DOS VASOS SANGUÍNEOS DEVIDO À DILATAÇÃO. “E, PARA MANTER A TEMPERATURA, O CORPO AUMENTA A FREQUÊNCIA CARDÍACA, O QUE GASTA MAIS ENERGIA”.',
          answer_at: '2019-12-01 12:00:00',
          created_at: '2019-11-28 12:00:00',
          updated_at: '2019-11-28 12:00:00',
        },
        {
          student_id: 2,
          question: 'QUANDO DEVO ALONGAR?',
          answer:
            'TRÊS VEZ POR SEMANA. É IMPORTANTE PARA DEIXAR OS MÚSCULOS MAIS LONGOS E FORTES, ALÉM DE LIBERAR O MOVIMENTO DAS ARTICULAÇÕES. ANTES E DEPOIS DA MUSCULAÇÃO O ALONGAMENTO PODE SER DISPENSADO – MOVIMENTOS SIMPLES, COMO POLICHINELO, SÃO SUFICIENTES.',
          answer_at: '2019-12-02 12:00:00',
          created_at: '2019-12-01 18:00:00',
          updated_at: '2019-12-01 18:00:00',
        },
        {
          student_id: 3,
          question: 'POSSO EMAGRECER 3 QUILOS EM UMA SEMANA?',
          answer:
            'MUITOS ESPECIALISTAS DEFENDEM QUE, ACIMA DE 2 QUILOS POR SEMANA, O EMAGRECIMENTO TRAZ MAIS PREJUÍZOS QUE BENEFÍCIOS: PERDER MASSA MAGRA JUNTAMENTE COM A GORDURA, POR EXEMPLO. ISSO CAUSA FLACIDEZ E METABOLISMO LENTO. MAS, COMO CADA ORGANISMO REAGE DE UMA MANEIRA, A MEDIDA NÃO É REGRA.',
          answer_at: '2019-12-04 12:00:00',
          created_at: '2019-12-07 18:00:00',
          updated_at: '2019-12-07 18:00:00',
        },
        {
          student_id: 4,
          question: 'MUSCULAÇÃO AJUDA NO CRESCIMENTO?',
          answer:
            'A ALTURA É DETERMINADA PELOS FATORES GENÉTICOS. PORÉM OS JOVENS DEVEM TOMAR CUIDADO COM EXERCÍCIOS MUITO VIOLENTOS E DE ALTO IMPACTO E CARGA EXAGERADA, POIS PODEM PROVOCAR INIBIÇÃO DOS NÚCLEOS DE CRESCIMENTO ÓSSEO, COM PREJUÍZOS NA ALTURA FINAL.',
          answer_at: '2019-12-07 12:00:00',
          created_at: '2019-12-07 18:00:00',
          updated_at: '2019-12-07 18:00:00',
        },
        {
          student_id: 5,
          question:
            'QUAIS OS PRINCIPAIS FATORES QUE CONTRIBUEM PARA O AUMENTO DA MASSA MUSCULAR (HIPERTROFIA)?',
          answer:
            'A MUSCULAÇÃO É UM INVESTIMENTO A LONGO PRAZO, OS RESULTADOS ALCANÇADOS REQUEREM TEMPO E DEDICAÇÃO, MAIS PODEMOS CITAR TRÊS FATORES QUE SÃO DETERMINANTES PARA ESSE AUMENTO MUSCULAR: GENÉTICA, ALIMENTAÇÃO, TREINAMENTO.',
          answer_at: '2019-12-10 08:00:00',
          created_at: '2019-12-15 15:00:00',
          updated_at: '2019-12-15 15:00:00',
        },
      ],
      {}
    );
  },

  down: () => {},
};
