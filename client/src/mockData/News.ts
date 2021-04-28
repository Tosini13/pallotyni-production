import { format } from "date-fns";

import { DATE_FORMAT, DATE_TIME_FORMAT } from "../models/Global";
import { News } from "../stores/NewsStore";

export const mockNews: News[] = [
  {
    id: format(new Date(), DATE_FORMAT) + "1",
    title: "New Stella Maris meeting",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero id. Ultrices tincidunt arcu non sodales neque. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Et malesuada fames ac turpis. Id semper risus in hendrerit gravida. Laoreet sit amet cursus sit amet. Bibendum enim facilisis gravida neque convallis. Dui nunc mattis enim ut tellus elementum sagittis vitae et.",
    createdAt: format(new Date(), DATE_TIME_FORMAT),
  },
  {
    id: format(new Date(), DATE_FORMAT) + "2",
    title: "Funeral of the Highest Septon",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero id. Ultrices tincidunt arcu non sodales neque. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Et malesuada fames ac turpis. Id semper risus in hendrerit gravida. Laoreet sit amet cursus sit amet. Bibendum enim facilisis gravida neque convallis. Dui nunc mattis enim ut tellus elementum sagittis vitae et.",
    createdAt: format(new Date(), DATE_TIME_FORMAT),
  },
  {
    id: format(new Date(), DATE_FORMAT) + "3",
    title: "Wedding day of the King's Hand",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero id. Ultrices tincidunt arcu non sodales neque. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Et malesuada fames ac turpis. Id semper risus in hendrerit gravida. Laoreet sit amet cursus sit amet. Bibendum enim facilisis gravida neque convallis. Dui nunc mattis enim ut tellus elementum sagittis vitae et.",
    createdAt: format(new Date(), DATE_TIME_FORMAT),
  },
  {
    id: format(new Date(), DATE_FORMAT) + "4",
    title: "Denearys died!",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero id. Ultrices tincidunt arcu non sodales neque. Laoreet id donec ultrices tincidunt arcu non sodales neque sodales. Nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper sit. Et malesuada fames ac turpis. Id semper risus in hendrerit gravida. Laoreet sit amet cursus sit amet. Bibendum enim facilisis gravida neque convallis. Dui nunc mattis enim ut tellus elementum sagittis vitae et.",
    createdAt: format(new Date(), DATE_TIME_FORMAT),
  },
];
