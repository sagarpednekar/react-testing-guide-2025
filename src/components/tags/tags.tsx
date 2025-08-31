import { useEffect, useState } from "react";

type Tag = {
  id: number;
  name: string;
};

const Tags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  useEffect(() => {
    const fetchTags = async () => {
      const res = await fetch("http://localhost:3004/tags");
      const response = await res.json();
      setTags(response.data);
    };
    fetchTags();
  }, []);

  return (
    <>
      {tags.map((tag) => (
        <div key={tag.id} data-testid="tag">
          {tag.name}
        </div>
      ))}
    </>
  );
};

export default Tags;
