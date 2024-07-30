import { showCases } from "@/actions/case/show-cases";
import WeekCalendarBlock from "@/components/calendar/week/week-calendar-block";
import { currentUser } from "@/lib/auth";
import { ActionType, Case, StageDeal } from "@prisma/client";

const taskList: any = [
  {
    id: "clupzf4rs00085ld8coegkliv",
    createdAt: "2024-04-07T20:34:23.080Z",
    type: "Call",
    comment:
      "Созвонился с директором он говорит, что типо рекама там сайты и прочее это не его тема. Надо подробнее узнать чем они занимаются и проанализировать компанию! ",
    date: "2024-07-31T08:34:22.909Z",
    responsible: null,
    finished: true,
    dealId: "clupzdiw600065ld8aqcuxo54",
  },
  {
    id: "clupzf4rs00085ld8coegkliv",
    createdAt: "2024-04-07T20:34:23.080Z",
    type: "Call",
    comment:
      "Созвонился с директором он говорит, что типо рекама там сайты и прочее это не его тема. Надо подробнее узнать чем они занимаются и проанализировать компанию! ",
    date: "2024-07-07T20:34:22.909Z",
    responsible: null,
    finished: true,
    dealId: "clupzdiw600065ld8aqcuxo54",
  },
  {
    id: "clupzflek000a5ld8lq9ly0fz",
    createdAt: "2024-04-07T20:34:44.635Z",
    type: "Meet",
    comment: "тнб",
    date: "2024-07-30T19:26:21.274Z",
    responsible: null,
    finished: true,
    dealId: "clupzdiw600065ld8aqcuxo54",
  },
  {
    id: "clupzmvoi000n5ld8lha1mxvi",
    createdAt: "2024-04-07T20:40:24.545Z",
    type: "Call",
    comment:
      "Созвонился с ним он сказал что пока ему ни чего не надо и он не рассматривает сйчас выход в интернет. Я спросил а в будущем... Он ни чего не ответил так как ехал на велосипеде договорились с ним позде созвониться.",
    date: "2024-07-07T20:40:24.294Z",
    responsible: null,
    finished: true,
    dealId: "clupzku52000l5ld820ojx3dv",
  },
  {
    id: "clus2immq001w1s8bjtfzi24b",
    createdAt: "2024-04-09T07:36:37.394Z",
    type: "Call",
    comment: "тнб",
    date: "2024-07-10T08:40:19.593Z",
    responsible: null,
    finished: true,
    dealId: "clus2ez6m001s1s8bzqbdysy8",
  },
  {
    id: "clus2qlsb00251s8bktqo7uvx",
    createdAt: "2024-04-09T07:42:49.547Z",
    type: "Call",
    comment:
      "Дозвонился до директора, он плохо меня слышал потом скинул и не стал брать трубку.",
    date: "2024-07-09T07:42:49.469Z",
    responsible: null,
    finished: true,
    dealId: "clus2m4sp00231s8bt8jgw5zw",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Call",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-09T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Meet",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-25T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Meet",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-25T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Meet",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-25T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Brief",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-25T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Brief",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-27T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Meet",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-27T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Call",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-27T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Call",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-27T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Call",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-27T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Call",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-27T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Call",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-27T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Call",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-27T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Call",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-27T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Call",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-07-27T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
  {
    id: "clus355xg002e1s8bm1qtg91x",
    createdAt: "2024-04-09T07:54:08.837Z",
    type: "Call",
    comment:
      "Пообщался с ним говорит , что открыли компанию, что бы учавствовать в тендерах. Я сказал что там ни чего не заработать, он согласился, сказал что рассматривает вопрос создания сайта позже. Списались с ним по вотсап. Скинул ему пример сайта. ",
    date: "2024-08-10T07:54:08.659Z",
    responsible: null,
    finished: true,
    dealId: "clus2w0zz002c1s8bwuopn6eg",
  },
];

const WeekCalendarPage = async ({
  searchParams,
}: {
  searchParams: {
    responsible: string;
    stage: StageDeal | "NOT_DIS";
    date: string;
    dateEnd: string;
    take: string;
    page: string;
    finished: string;
    type: ActionType;
  };
}) => {
  const user = await currentUser();
  const {
    cases,
    count: countCase,
    success: successCase,
    error: errorCase,
  } = await showCases({
    user: {
      userId: user?.id,
      userRole: user?.role,
      bloked: user?.bloked,
    },
    params: {
      finished: searchParams?.finished,
      type: searchParams?.type,
      date: searchParams?.date,
      dateEnd: searchParams?.dateEnd,
      take: "99999",
      page: searchParams?.page,
      responsible: searchParams.responsible,
    },
  });
  return <WeekCalendarBlock tasks={cases} />;
};

export default WeekCalendarPage;
