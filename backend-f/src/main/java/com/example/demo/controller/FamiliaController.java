package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.FamiliaEntity;
import com.example.demo.interfaces.IFamiliaService;

@RestController
@RequestMapping("/api/v1/entities/familias")
@CrossOrigin(origins = "http://localhost:9992")
public class FamiliaController {

	@Autowired
	private IFamiliaService service;

	@GetMapping
    public ResponseEntity<?> findAll(){
        try {
            return ResponseEntity.ok(service.findAll());
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> findById(@PathVariable Long id){
        try {
            return ResponseEntity.ok(service.findById(id));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }

    @PostMapping
    public ResponseEntity<?> save(@RequestBody FamiliaEntity familia){
        try {
            return ResponseEntity.ok(service.save(familia));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@RequestBody FamiliaEntity familia, @PathVariable Long id){
        try {
        	FamiliaEntity existingFamilia = service.findById(id);
            if (existingFamilia == null) {
                return ResponseEntity.status(404).body("Persona no encontrada");
            }
            existingFamilia.setNombref(familia.getNombref());
            existingFamilia.setRepresentante(familia.getRepresentante());
            existingFamilia.setEstadoCivilPadres(familia.getEstadoCivilPadres());
            existingFamilia.setSituacionVivienda(familia.getSituacionVivienda());
            existingFamilia.setTelefono_fijo(familia.getTelefono_fijo());
            existingFamilia.setContacto_emergencia(familia.getContacto_emergencia());
            return ResponseEntity.ok(service.save(existingFamilia));
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        try {
            FamiliaEntity existingFamilia = service.findById(id);
            if (existingFamilia == null) {
                return ResponseEntity.status(404).body("Familia no encontrada");
            }
            service.deleteById(id);
            return ResponseEntity.ok("[]");
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e);
        }
    }
}