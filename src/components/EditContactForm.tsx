"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditContactSchema } from "@/lib/validationSchemas";
import { editContact } from "@/lib/dbActions";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

export type EditContactFields = {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
};

export default function EditContactForm({ contact }: { contact: EditContactFields }) {
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EditContactFields>({
    resolver: yupResolver(EditContactSchema),
    defaultValues: { ...contact },
  });

  const onSubmit = async (data: EditContactFields) => {
    setSuccess(null); setError(null);
    try {
      // Do NOT pass owner on update
      await editContact({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        image: data.image,
        description: data.description,
      });
      setSuccess("Contact updated.");
    } catch (e: any) {
      setError(e?.message ?? "Failed to update contact.");
    }
  };

  return (
    <Row className="justify-content-center py-4">
      <Col xs={10}>
        <h2 className="mb-3 text-center">Edit Contact</h2>

        {success && <Alert variant="success">{success}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)} noValidate className="mx-auto" style={{ maxWidth: 720 }}>
          <input type="hidden" {...register("id", { valueAsNumber: true })} />
          <Row className="g-3">
            <Col sm={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" {...register("firstName")} isInvalid={!!errors.firstName} />
                <Form.Control.Feedback type="invalid">{errors.firstName?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" {...register("lastName")} isInvalid={!!errors.lastName} />
                <Form.Control.Feedback type="invalid">{errors.lastName?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" {...register("address")} isInvalid={!!errors.address} />
                <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col sm={6}>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control type="url" {...register("image")} isInvalid={!!errors.image} />
                <Form.Control.Feedback type="invalid">{errors.image?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} {...register("description")} isInvalid={!!errors.description} />
                <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col xs={12} className="d-flex align-items-center justify-content-center gap-3 mt-2">
              <Button type="submit" disabled={isSubmitting} variant="primary">
                {isSubmitting ? "Updating…" : "Submit"}
              </Button>
              <Button type="button" variant="warning" onClick={() => reset(contact)}>
                Reset
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
    </Row>
  );
}
