import { Link } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import SidebarItemNested from "./SidebarItemNested";
import BatchItem from "./batchItem/BatchItem.jsx";
import ProductItem from "./productItem/ProductItem.jsx";

function SidebarHome() {


    return (
        <div className="flex-shrink-0 p-3 bg-white border-end">
            <Link
                to="/"
                className="d-flex align-items-center pb-3 mb-3 link-dark text-decoration-none border-bottom"
            >
                <span className="fs-5 fw-semibold">Меню</span>
            </Link>

            <ul className="list-unstyled ps-0">
                <BatchItem/>
                <ProductItem/>

                <SidebarItem
                    label="Операції"
                    items={[
                        { label: "Наліпка стікерів" },
                        { label: "Прошивка" },
                        { label: "Тестування" },
                    ]}
                />

                <li className="border-top my-3"></li>

                <SidebarItem label="Налаштування" items={[]}>
                    <SidebarItemNested
                        label="Операції"
                        subItems={[
                            { label: "Додати" },
                            { label: "Замінити" },
                            { label: "Видалити" },
                        ]}
                    />
                    <SidebarItemNested
                        label="Співробітники"
                        subItems={[
                            { label: "Додати" },
                            { label: "Замінити" },
                            { label: "Видалити" },
                        ]}
                    />
                </SidebarItem>
            </ul>
        </div>
    );
}

export default SidebarHome;
