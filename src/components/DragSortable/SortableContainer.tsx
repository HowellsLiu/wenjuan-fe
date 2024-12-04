import React, { FC } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
type PropsType = {
  children: JSX.Element | JSX.Element[]; //类似于vue中的slot
  items: Array<{ id: string; [key: string]: any }>;
  onDragEnd: (oldIndex: number, newIndex: number) => void;
};
const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { children, items, onDragEnd } = props;
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, //8px,拖拽的对象＞8的像素才认定为是拖拽,否则是点击
      },
    })
  );
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over == null) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((c) => c.fe_id === active.id);
      const newIndex = items.findIndex((c) => c.fe_id === over.id);
      onDragEnd(oldIndex, newIndex);
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};
export default SortableContainer;
