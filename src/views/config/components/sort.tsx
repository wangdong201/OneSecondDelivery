import type { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

const Wrapper = styled.div`
  .ant-table-cell {
    border-bottom: none !important;
    background: #fff !important;
    padding: 0 !important;
  }
  .boxBrd {
    border: 1px solid #ccc;
  }
`;

interface DataType {
  key: string;
  name: string;
}

const columns: ColumnsType<DataType> = [
  {
    dataIndex: "name",
    render: (text) => (
      <div className="w-[250px] pb-[8px] ">
        <span className="boxBrd flex justify-between items-center w-[100%] h-[32px] px-[12px] rounded-[4px] border border-[#e1e1e1]">
          {text}
          <Icon icon="ph:list-fill" />
        </span>
      </div>
    )
  }
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row = (props: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: props["data-row-key"]
  });

  const style: React.CSSProperties = {
    ...props.style,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    cursor: "move",
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    ...(isDragging ? { position: "relative", zIndex: 9999 } : {})
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    />
  );
};

// eslint-disable-next-line react/prop-types
const Sort: React.FC<{ data: DataType[] }> = ({ data }) => {
  const [dataSource, setDataSource] = useState(data);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1
      }
    })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  return (
    <Wrapper>
      <DndContext
        sensors={sensors}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={onDragEnd}
      >
        <SortableContext
          items={dataSource.map((i) => i.key)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{
              body: {
                row: Row
              }
            }}
            rowKey="key"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
          ></Table>
        </SortableContext>
      </DndContext>
    </Wrapper>
  );
};

export default Sort;
