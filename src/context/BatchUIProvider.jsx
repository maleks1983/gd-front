import { useState } from "react";
import { BatchUIContext } from "./batchUIContext.js";

export function BatchUIProvider({ children }) {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);

    const openAddModal = () => setShowAddModal(true);
    const closeAddModal = () => setShowAddModal(false);

    const openUpdateModal = () => setShowUpdateModal(true);
    const closeUpdateModal = () => setShowUpdateModal(false);

    const openDeleteModal = () => setShowDeleteModal(true);
    const closeDeleteModal = () => setShowDeleteModal(false);

    const openDeleteProductModal = () => setShowDeleteProductModal(true);
    const closeDeleteProductModal = () => setShowDeleteProductModal(false);

    const openAddProductModal = () => setShowAddProductModal(true);
    const closeAddProductModal = () => setShowAddProductModal(false);

    const openUpdateProductModal = () => setShowUpdateProductModal(true);
    const closeUpdateProductModal = () => setShowUpdateProductModal(false);

    return (
        <BatchUIContext.Provider value={{
            showAddModal, openAddModal, closeAddModal,
            showUpdateModal, openUpdateModal, closeUpdateModal,
            showDeleteModal, openDeleteModal, closeDeleteModal,
            showDeleteProductModal, openDeleteProductModal, closeDeleteProductModal,
            showAddProductModal, openAddProductModal, closeAddProductModal,
            showUpdateProductModal, openUpdateProductModal, closeUpdateProductModal
        }}>
            {children}
        </BatchUIContext.Provider>
    );
}
