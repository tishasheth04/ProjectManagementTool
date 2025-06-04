import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ tabs, setSelected, children }) {
  return (
    <div className="tabs-container">
      <Tab.Group>
        <Tab.List className="tab-list">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.title}
              onClick={() => setSelected(index)}
              className={({ selected }) =>
                `tab ${selected ? "selected" : ""}`
              }
            >
              {tab.icon}
              <span>{tab.title}</span>
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels style={{ width: "100%", marginTop: "0.5rem" }}>
          {children}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
