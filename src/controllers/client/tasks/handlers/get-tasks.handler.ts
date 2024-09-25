import { di } from "@config";
import { TaskService } from "@services";
import { GetTasksType } from "../schemas";
import { AppFastifyHandler, SuccessCode } from "@types";

export const getTasksHandler: AppFastifyHandler<GetTasksType> = async (
  req,
  reply
) => {
  const taskService = di.container.resolve<TaskService>(TaskService.name);

  const { totalSize, tasks } = await taskService.getTasks({
    pagination: req.query,
  });

  const items = tasks.map((task) => ({
    ...task,
    _id: String(task._id),
  }));

  reply.code(SuccessCode.OK);
  reply.send({ totalSize, items });
};
