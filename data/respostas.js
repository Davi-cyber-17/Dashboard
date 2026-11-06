/* Dados da pesquisa "Juventude e Organização".
   Fonte: CSV exportado do Google Forms (22 respostas, 7 perguntas).
   As respostas estão exatamente como no CSV; só o carimbo de data/hora foi omitido (não é usado).
   Perguntas 2, 4 e 7 são de múltipla seleção (lista de opções por participante).
   Nenhum total ou porcentagem é escrito aqui: tudo é calculado em script.js. */
window.PESQUISA = {
 "perguntas": [
  {
   "id": "q1",
   "numero": 1,
   "curto": "Planejamento",
   "titulo": "Frequência de planejamento",
   "multipla": false,
   "grafico": "colunas",
   "ordenar": "escala",
   "opcoes": [
    {
     "valor": "Sempre",
     "completo": "Sempre",
     "rotulo": "Sempre"
    },
    {
     "valor": "Frequentemente",
     "completo": "Frequentemente",
     "rotulo": "Frequentemente"
    },
    {
     "valor": "Às vezes",
     "completo": "Às vezes",
     "rotulo": "Às vezes"
    },
    {
     "valor": "Raramente",
     "completo": "Raramente",
     "rotulo": "Raramente"
    },
    {
     "valor": "Nunca",
     "completo": "Nunca",
     "rotulo": "Nunca"
    }
   ],
   "enunciado": "Com que frequência você planeja suas atividades e compromissos antes de começar o dia ou a semana?"
  },
  {
   "id": "q2",
   "numero": 2,
   "curto": "Dificuldade",
   "titulo": "Dificuldades na organização",
   "multipla": true,
   "grafico": "barras",
   "ordenar": "frequencia",
   "opcoes": [
    {
     "valor": "Procrastinação (deixar atividades para depois)",
     "completo": "Procrastinação (deixar atividades para depois)",
     "rotulo": "Procrastinação"
    },
    {
     "valor": "Distrações, como celular e redes sociais",
     "completo": "Distrações, como celular e redes sociais",
     "rotulo": "Distrações (celular e redes)"
    },
    {
     "valor": "Excesso de tarefas e compromissos",
     "completo": "Excesso de tarefas e compromissos",
     "rotulo": "Excesso de tarefas"
    },
    {
     "valor": "Falta de planejamento",
     "completo": "Falta de planejamento",
     "rotulo": "Falta de planejamento"
    },
    {
     "valor": "Dificuldade para definir prioridades",
     "completo": "Dificuldade para definir prioridades",
     "rotulo": "Dificuldade para priorizar"
    },
    {
     "valor": "Não tenho grandes dificuldades",
     "completo": "Não tenho grandes dificuldades",
     "rotulo": "Sem grandes dificuldades",
     "neutro": true
    }
   ],
   "enunciado": "Qual é sua maior dificuldade para manter uma rotina organizada?"
  },
  {
   "id": "q3",
   "numero": 3,
   "curto": "Tarefas não cumpridas",
   "titulo": "Tarefas não cumpridas",
   "multipla": false,
   "grafico": "rosca",
   "ordenar": "escala",
   "opcoes": [
    {
     "valor": "Sempre",
     "completo": "Sempre",
     "rotulo": "Sempre"
    },
    {
     "valor": "Frequentemente",
     "completo": "Frequentemente",
     "rotulo": "Frequentemente"
    },
    {
     "valor": "Às vezes",
     "completo": "Às vezes",
     "rotulo": "Às vezes"
    },
    {
     "valor": "Raramente",
     "completo": "Raramente",
     "rotulo": "Raramente"
    },
    {
     "valor": "Nunca",
     "completo": "Nunca",
     "rotulo": "Nunca"
    }
   ],
   "enunciado": "Com que frequência você deixa de cumprir alguma tarefa ou compromisso por falta de organização?"
  },
  {
   "id": "q4",
   "numero": 4,
   "curto": "Método usado",
   "titulo": "Métodos e ferramentas utilizados",
   "multipla": true,
   "grafico": "barras",
   "ordenar": "frequencia",
   "opcoes": [
    {
     "valor": "Memorizo minhas atividades",
     "completo": "Memorizo minhas atividades",
     "rotulo": "Memorizo as atividades"
    },
    {
     "valor": "Agenda ou caderno",
     "completo": "Agenda ou caderno",
     "rotulo": "Agenda ou caderno"
    },
    {
     "valor": "Calendário ou lembretes do celular",
     "completo": "Calendário ou lembretes do celular",
     "rotulo": "Calendário/lembretes do celular"
    },
    {
     "valor": "Listas de tarefas",
     "completo": "Listas de tarefas",
     "rotulo": "Listas de tarefas"
    },
    {
     "valor": "Planilhas digitais",
     "completo": "Planilhas digitais",
     "rotulo": "Planilhas digitais"
    },
    {
     "valor": "Aplicativos de organização",
     "completo": "Aplicativos de organização",
     "rotulo": "Aplicativos de organização"
    },
    {
     "valor": "Não utilizo nenhum método",
     "completo": "Não utilizo nenhum método",
     "rotulo": "Nenhum método"
    },
    {
     "valor": "Combinação de memória e caderno",
     "completo": "Combinação de memória e caderno",
     "rotulo": "Memória + caderno"
    }
   ],
   "enunciado": "Quais métodos ou ferramentas você utiliza para organizar suas tarefas e compromissos?"
  },
  {
   "id": "q5",
   "numero": 5,
   "curto": "Várias tarefas",
   "titulo": "Organização de várias tarefas",
   "multipla": false,
   "grafico": "rosca",
   "ordenar": "frequencia",
   "opcoes": [
    {
     "valor": "Organizo as tarefas por ordem de prioridade.",
     "completo": "Organizo as tarefas por ordem de prioridade",
     "rotulo": "Por ordem de prioridade"
    },
    {
     "valor": "Realizo as tarefas conforme aparecem.",
     "completo": "Realizo as tarefas conforme aparecem",
     "rotulo": "Conforme aparecem"
    },
    {
     "valor": "Tenho dificuldade para decidir por onde começar.",
     "completo": "Tenho dificuldade para decidir por onde começar",
     "rotulo": "Dificuldade para começar"
    },
    {
     "valor": "Começo pelas tarefas mais rápidas.",
     "completo": "Começo pelas tarefas mais rápidas",
     "rotulo": "Começo pelas mais rápidas"
    }
   ],
   "enunciado": "Quando você tem várias tarefas para realizar no mesmo período, como costuma organizá-las?"
  },
  {
   "id": "q6",
   "numero": 6,
   "curto": "Impacto",
   "titulo": "Impacto da falta de organização",
   "multipla": false,
   "grafico": "colunas",
   "ordenar": "escala",
   "opcoes": [
    {
     "valor": "1 - Não prejudica",
     "completo": "1 - Não prejudica",
     "rotulo": "Não prejudica",
     "marca": 1
    },
    {
     "valor": "2 - Prejudica pouco",
     "completo": "2 - Prejudica pouco",
     "rotulo": "Pouco",
     "marca": 2
    },
    {
     "valor": "3 - Prejudica moderadamente",
     "completo": "3 - Prejudica moderadamente",
     "rotulo": "Moderadamente",
     "marca": 3
    },
    {
     "valor": "4 - Prejudica bastante",
     "completo": "4 - Prejudica bastante",
     "rotulo": "Bastante",
     "marca": 4
    },
    {
     "valor": "5 - Prejudica muito",
     "completo": "5 - Prejudica muito",
     "rotulo": "Muito",
     "marca": 5
    }
   ],
   "enunciado": "Em uma escala de 1 a 5, quanto você acredita que a falta de organização prejudica sua vida"
  },
  {
   "id": "q7",
   "numero": 7,
   "curto": "Recurso desejado",
   "titulo": "Recursos desejados",
   "multipla": true,
   "grafico": "barras",
   "ordenar": "frequencia",
   "opcoes": [
    {
     "valor": "Lembretes automáticos.",
     "completo": "Lembretes automáticos",
     "rotulo": "Lembretes automáticos"
    },
    {
     "valor": "Aplicativo para organizar tarefas e compromissos.",
     "completo": "Aplicativo para organizar tarefas e compromissos",
     "rotulo": "Aplicativo de tarefas e compromissos"
    },
    {
     "valor": "Sugestões inteligentes para organizar minha rotina.",
     "completo": "Sugestões inteligentes para organizar minha rotina",
     "rotulo": "Sugestões inteligentes de rotina"
    },
    {
     "valor": "Acompanhamento de metas e objetivos.",
     "completo": "Acompanhamento de metas e objetivos",
     "rotulo": "Acompanhamento de metas"
    },
    {
     "valor": "Controle e gerenciamento do tempo.",
     "completo": "Controle e gerenciamento do tempo",
     "rotulo": "Controle do tempo"
    },
    {
     "valor": "Ajuda para definir prioridades.",
     "completo": "Ajuda para definir prioridades",
     "rotulo": "Ajuda para definir prioridades"
    }
   ],
   "enunciado": "Quais recursos mais ajudariam você a ter uma rotina organizada?"
  }
 ],
 "respostas": [
  {
   "id": 1,
   "q1": "Frequentemente",
   "q2": [
    "Excesso de tarefas e compromissos",
    "Distrações, como celular e redes sociais"
   ],
   "q3": "Frequentemente",
   "q4": [
    "Calendário ou lembretes do celular",
    "Memorizo minhas atividades"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "5 - Prejudica muito",
   "q7": [
    "Aplicativo para organizar tarefas e compromissos."
   ]
  },
  {
   "id": 2,
   "q1": "Ás vezes",
   "q2": [
    "Falta de planejamento",
    "Procrastinação (deixar atividades para depois)",
    "Distrações, como celular e redes sociais"
   ],
   "q3": "Frequentemente",
   "q4": [
    "Agenda ou caderno",
    "Calendário ou lembretes do celular"
   ],
   "q5": "Realizo as tarefas conforme aparecem.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Aplicativo para organizar tarefas e compromissos.",
    "Lembretes automáticos.",
    "Ajuda para definir prioridades.",
    "Controle e gerenciamento do tempo.",
    "Acompanhamento de metas e objetivos.",
    "Sugestões inteligentes para organizar minha rotina."
   ]
  },
  {
   "id": 3,
   "q1": "Frequentemente",
   "q2": [
    "Excesso de tarefas e compromissos"
   ],
   "q3": "Raramente",
   "q4": [
    "Agenda ou caderno",
    "Calendário ou lembretes do celular",
    "Planilhas digitais",
    "Listas de tarefas"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Aplicativo para organizar tarefas e compromissos.",
    "Lembretes automáticos.",
    "Ajuda para definir prioridades.",
    "Controle e gerenciamento do tempo."
   ]
  },
  {
   "id": 4,
   "q1": "Frequentemente",
   "q2": [
    "Procrastinação (deixar atividades para depois)",
    "Distrações, como celular e redes sociais"
   ],
   "q3": "Raramente",
   "q4": [
    "Listas de tarefas",
    "Memorizo minhas atividades"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Ajuda para definir prioridades.",
    "Acompanhamento de metas e objetivos.",
    "Sugestões inteligentes para organizar minha rotina."
   ]
  },
  {
   "id": 5,
   "q1": "Ás vezes",
   "q2": [
    "Falta de planejamento",
    "Excesso de tarefas e compromissos"
   ],
   "q3": "Frequentemente",
   "q4": [
    "Aplicativos de organização",
    "Agenda ou caderno",
    "Memorizo minhas atividades"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Lembretes automáticos.",
    "Ajuda para definir prioridades."
   ]
  },
  {
   "id": 6,
   "q1": "Nunca",
   "q2": [
    "Falta de planejamento",
    "Procrastinação (deixar atividades para depois)",
    "Distrações, como celular e redes sociais",
    "Dificuldade para definir prioridades"
   ],
   "q3": "Às vezes",
   "q4": [
    "Agenda ou caderno",
    "Calendário ou lembretes do celular",
    "Memorizo minhas atividades"
   ],
   "q5": "Começo pelas tarefas mais rápidas.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Aplicativo para organizar tarefas e compromissos."
   ]
  },
  {
   "id": 7,
   "q1": "Frequentemente",
   "q2": [
    "Não tenho grandes dificuldades"
   ],
   "q3": "Raramente",
   "q4": [
    "Memorizo minhas atividades",
    "Combinação de memória e caderno"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Sugestões inteligentes para organizar minha rotina."
   ]
  },
  {
   "id": 8,
   "q1": "Frequentemente",
   "q2": [
    "Não tenho grandes dificuldades"
   ],
   "q3": "Raramente",
   "q4": [
    "Agenda ou caderno"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Acompanhamento de metas e objetivos."
   ]
  },
  {
   "id": 9,
   "q1": "Frequentemente",
   "q2": [
    "Não tenho grandes dificuldades"
   ],
   "q3": "Raramente",
   "q4": [
    "Agenda ou caderno"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "4 - Prejudica bastante",
   "q7": [
    "Acompanhamento de metas e objetivos."
   ]
  },
  {
   "id": 10,
   "q1": "Ás vezes",
   "q2": [
    "Falta de planejamento",
    "Procrastinação (deixar atividades para depois)",
    "Distrações, como celular e redes sociais",
    "Dificuldade para definir prioridades"
   ],
   "q3": "Frequentemente",
   "q4": [
    "Memorizo minhas atividades"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "5 - Prejudica muito",
   "q7": [
    "Aplicativo para organizar tarefas e compromissos.",
    "Lembretes automáticos.",
    "Ajuda para definir prioridades.",
    "Controle e gerenciamento do tempo.",
    "Acompanhamento de metas e objetivos.",
    "Sugestões inteligentes para organizar minha rotina."
   ]
  },
  {
   "id": 11,
   "q1": "Raramente",
   "q2": [
    "Falta de planejamento",
    "Procrastinação (deixar atividades para depois)"
   ],
   "q3": "Frequentemente",
   "q4": [
    "Não utilizo nenhum método"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Controle e gerenciamento do tempo.",
    "Sugestões inteligentes para organizar minha rotina."
   ]
  },
  {
   "id": 12,
   "q1": "Ás vezes",
   "q2": [
    "Falta de planejamento",
    "Procrastinação (deixar atividades para depois)"
   ],
   "q3": "Às vezes",
   "q4": [
    "Não utilizo nenhum método"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Lembretes automáticos."
   ]
  },
  {
   "id": 13,
   "q1": "Nunca",
   "q2": [
    "Falta de planejamento",
    "Procrastinação (deixar atividades para depois)",
    "Distrações, como celular e redes sociais"
   ],
   "q3": "Frequentemente",
   "q4": [
    "Aplicativos de organização",
    "Agenda ou caderno",
    "Listas de tarefas"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "4 - Prejudica bastante",
   "q7": [
    "Aplicativo para organizar tarefas e compromissos.",
    "Lembretes automáticos.",
    "Controle e gerenciamento do tempo.",
    "Acompanhamento de metas e objetivos.",
    "Sugestões inteligentes para organizar minha rotina."
   ]
  },
  {
   "id": 14,
   "q1": "Frequentemente",
   "q2": [
    "Procrastinação (deixar atividades para depois)",
    "Dificuldade para definir prioridades"
   ],
   "q3": "Às vezes",
   "q4": [
    "Memorizo minhas atividades"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "4 - Prejudica bastante",
   "q7": [
    "Lembretes automáticos.",
    "Ajuda para definir prioridades."
   ]
  },
  {
   "id": 15,
   "q1": "Ás vezes",
   "q2": [
    "Procrastinação (deixar atividades para depois)"
   ],
   "q3": "Às vezes",
   "q4": [
    "Memorizo minhas atividades"
   ],
   "q5": "Realizo as tarefas conforme aparecem.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Aplicativo para organizar tarefas e compromissos."
   ]
  },
  {
   "id": 16,
   "q1": "Raramente",
   "q2": [
    "Procrastinação (deixar atividades para depois)",
    "Excesso de tarefas e compromissos",
    "Distrações, como celular e redes sociais",
    "Dificuldade para definir prioridades"
   ],
   "q3": "Às vezes",
   "q4": [
    "Agenda ou caderno",
    "Calendário ou lembretes do celular",
    "Planilhas digitais",
    "Memorizo minhas atividades"
   ],
   "q5": "Tenho dificuldade para decidir por onde começar.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Lembretes automáticos.",
    "Ajuda para definir prioridades.",
    "Controle e gerenciamento do tempo.",
    "Acompanhamento de metas e objetivos."
   ]
  },
  {
   "id": 17,
   "q1": "Sempre",
   "q2": [
    "Distrações, como celular e redes sociais"
   ],
   "q3": "Raramente",
   "q4": [
    "Calendário ou lembretes do celular"
   ],
   "q5": "Realizo as tarefas conforme aparecem.",
   "q6": "5 - Prejudica muito",
   "q7": [
    "Controle e gerenciamento do tempo.",
    "Sugestões inteligentes para organizar minha rotina."
   ]
  },
  {
   "id": 18,
   "q1": "Frequentemente",
   "q2": [
    "Procrastinação (deixar atividades para depois)",
    "Excesso de tarefas e compromissos",
    "Distrações, como celular e redes sociais"
   ],
   "q3": "Às vezes",
   "q4": [
    "Aplicativos de organização",
    "Calendário ou lembretes do celular",
    "Listas de tarefas",
    "Memorizo minhas atividades"
   ],
   "q5": "Tenho dificuldade para decidir por onde começar.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Aplicativo para organizar tarefas e compromissos.",
    "Lembretes automáticos.",
    "Ajuda para definir prioridades.",
    "Controle e gerenciamento do tempo.",
    "Sugestões inteligentes para organizar minha rotina."
   ]
  },
  {
   "id": 19,
   "q1": "Sempre",
   "q2": [
    "Procrastinação (deixar atividades para depois)",
    "Excesso de tarefas e compromissos"
   ],
   "q3": "Frequentemente",
   "q4": [
    "Agenda ou caderno",
    "Calendário ou lembretes do celular",
    "Listas de tarefas"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "5 - Prejudica muito",
   "q7": [
    "Aplicativo para organizar tarefas e compromissos.",
    "Lembretes automáticos.",
    "Acompanhamento de metas e objetivos."
   ]
  },
  {
   "id": 20,
   "q1": "Sempre",
   "q2": [
    "Falta de planejamento",
    "Procrastinação (deixar atividades para depois)",
    "Excesso de tarefas e compromissos",
    "Distrações, como celular e redes sociais"
   ],
   "q3": "Às vezes",
   "q4": [
    "Memorizo minhas atividades"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "5 - Prejudica muito",
   "q7": [
    "Aplicativo para organizar tarefas e compromissos.",
    "Lembretes automáticos.",
    "Ajuda para definir prioridades.",
    "Controle e gerenciamento do tempo.",
    "Acompanhamento de metas e objetivos.",
    "Sugestões inteligentes para organizar minha rotina."
   ]
  },
  {
   "id": 21,
   "q1": "Sempre",
   "q2": [
    "Procrastinação (deixar atividades para depois)",
    "Excesso de tarefas e compromissos",
    "Distrações, como celular e redes sociais"
   ],
   "q3": "Às vezes",
   "q4": [
    "Agenda ou caderno",
    "Planilhas digitais",
    "Listas de tarefas",
    "Memorizo minhas atividades"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "2 - Prejudica pouco",
   "q7": [
    "Lembretes automáticos.",
    "Acompanhamento de metas e objetivos.",
    "Sugestões inteligentes para organizar minha rotina."
   ]
  },
  {
   "id": 22,
   "q1": "Ás vezes",
   "q2": [
    "Procrastinação (deixar atividades para depois)",
    "Excesso de tarefas e compromissos",
    "Distrações, como celular e redes sociais"
   ],
   "q3": "Raramente",
   "q4": [
    "Calendário ou lembretes do celular"
   ],
   "q5": "Organizo as tarefas por ordem de prioridade.",
   "q6": "3 - Prejudica moderadamente",
   "q7": [
    "Aplicativo para organizar tarefas e compromissos.",
    "Lembretes automáticos.",
    "Sugestões inteligentes para organizar minha rotina."
   ]
  }
 ]
};
