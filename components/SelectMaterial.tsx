type MaterialDetail = {
  id: string;
  name: string;
};

type Materials = Array<string>;

type MaterialDetails = {
  [key: string]: MaterialDetail;
};

export const defaultMaterial = "MeshNormalMaterial";

const materials: Materials = [
  defaultMaterial,
  "MeshPhongMaterial",
  "MeshMatcapMaterial",
  "MeshDepthMaterial",
  "MeshToonMaterial",
];

const materialDetails: MaterialDetails = {
  MeshNormalMaterial: {
    id: "mesh-normal-material",
    name: "mesh normal material",
  },
  MeshPhongMaterial: {
    id: "mesh-phong-material",
    name: "mesh phong material",
  },
  MeshMatcapMaterial: {
    id: "mesh-matcap-material",
    name: "mesh matcap material",
  },
  MeshDepthMaterial: {
    id: "mesh-depth-material",
    name: "mesh depth material",
  },
  MeshToonMaterial: {
    id: "mesh-toon-material",
    name: "mesh toon material",
  },
};

type Props = {
  onMaterialChange: (type: string) => void;
};

const SelectMaterial = ({ onMaterialChange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onMaterialChange(event.target.value);
  };

  const renderOptions = () => {
    return materials.map((material) => (
      <option key={materialDetails[material].id} value={material}>
        {materialDetails[material].name}
      </option>
    ));
  };

  return (
    <form>
      <label htmlFor="select-material" className="pr-2 text-white">
        Select material
      </label>
      <select
        id="select-material"
        name="select-material"
        onChange={handleChange}
      >
        {renderOptions()}
      </select>
    </form>
  );
};

export default SelectMaterial;
