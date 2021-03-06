/* Copyright 2013 Samuel Halliday (generated Java and C).
 * Copyright 2003-2007 Keith Seymour (Fortran to Java translation).
 * Copyright 1992-2007 The University of Tennessee. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 * - Redistributions of source code must retain the above copyright
 *   notice, this list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright
 *   notice, this list of conditions and the following disclaimer listed
 *   in this license in the documentation and/or other materials
 *   provided with the distribution.
 *
 * - Neither the name of the copyright holders nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
package com.github.fommil.netlib;

/**
 * Generated by {@code F2jImplGenerator} from {@code org.netlib.blas} in {@code net.sourceforge.f2j:arpack_combined_all:jar:0.1}.
 */
public class F2jBLAS extends com.github.fommil.netlib.BLAS {
//  @Override
//  public double dasum(int n, double[] dx, int incx) {
//    return org.netlib.blas.Dasum.dasum(n, dx, 0, incx);
//  }

//  @Override
//  public double dasum(int n, double[] dx, int _dx_offset, int incx) {
//    return org.netlib.blas.Dasum.dasum(n, dx, _dx_offset, incx);
//  }

//  @Override
//  public void daxpy(int n, double da, double[] dx, int incx, double[] dy, int incy) {
//   org.netlib.blas.Daxpy.daxpy(n, da, dx, 0, incx, dy, 0, incy);
//  }

//  @Override
//  public void daxpy(int n, double da, double[] dx, int _dx_offset, int incx, double[] dy, int _dy_offset, int incy) {
//   org.netlib.blas.Daxpy.daxpy(n, da, dx, _dx_offset, incx, dy, _dy_offset, incy);
//  }

//  @Override
//  public void dcopy(int n, double[] dx, int incx, double[] dy, int incy) {
//   org.netlib.blas.Dcopy.dcopy(n, dx, 0, incx, dy, 0, incy);
//  }

//  @Override
//  public void dcopy(int n, double[] dx, int _dx_offset, int incx, double[] dy, int _dy_offset, int incy) {
//   org.netlib.blas.Dcopy.dcopy(n, dx, _dx_offset, incx, dy, _dy_offset, incy);
//  }

//  @Override
//  public double ddot(int n, double[] dx, int incx, double[] dy, int incy) {
//    return org.netlib.blas.Ddot.ddot(n, dx, 0, incx, dy, 0, incy);
//  }

//  @Override
//  public double ddot(int n, double[] dx, int _dx_offset, int incx, double[] dy, int _dy_offset, int incy) {
//    return org.netlib.blas.Ddot.ddot(n, dx, _dx_offset, incx, dy, _dy_offset, incy);
//  }

  @Override
  public void dgbmv(java.lang.String trans, int m, int n, int kl, int ku, double alpha, double[] a, int lda, double[] x, int incx, double beta, double[] y, int incy) {
   org.netlib.blas.Dgbmv.dgbmv(trans, m, n, kl, ku, alpha, a, 0, lda, x, 0, incx, beta, y, 0, incy);
  }

//  @Override
//  public void dgbmv(java.lang.String trans, int m, int n, int kl, int ku, double alpha, double[] a, int _a_offset, int lda, double[] x, int _x_offset, int incx, double beta, double[] y, int _y_offset, int incy) {
//   org.netlib.blas.Dgbmv.dgbmv(trans, m, n, kl, ku, alpha, a, _a_offset, lda, x, _x_offset, incx, beta, y, _y_offset, incy);
//  }

  @Override
  public void dgemm(java.lang.String transa, java.lang.String transb, int m, int n, int k, double alpha, double[] a, int lda, double[] b, int ldb, double beta, double[] c, int ldc) {
   org.netlib.blas.Dgemm.dgemm(transa, transb, m, n, k, alpha, a, 0, lda, b, 0, ldb, beta, c, 0, ldc);
  }

//  @Override
//  public void dgemm(java.lang.String transa, java.lang.String transb, int m, int n, int k, double alpha, double[] a, int _a_offset, int lda, double[] b, int _b_offset, int ldb, double beta, double[] c, int _c_offset, int ldc) {
//   org.netlib.blas.Dgemm.dgemm(transa, transb, m, n, k, alpha, a, _a_offset, lda, b, _b_offset, ldb, beta, c, _c_offset, ldc);
//  }

  @Override
  public void dgemv(java.lang.String trans, int m, int n, double alpha, double[] a, int lda, double[] x, int incx, double beta, double[] y, int incy) {
   org.netlib.blas.Dgemv.dgemv(trans, m, n, alpha, a, 0, lda, x, 0, incx, beta, y, 0, incy);
  }

//  @Override
//  public void dgemv(java.lang.String trans, int m, int n, double alpha, double[] a, int _a_offset, int lda, double[] x, int _x_offset, int incx, double beta, double[] y, int _y_offset, int incy) {
//   org.netlib.blas.Dgemv.dgemv(trans, m, n, alpha, a, _a_offset, lda, x, _x_offset, incx, beta, y, _y_offset, incy);
//  }

  @Override
  public void dger(int m, int n, double alpha, double[] x, int incx, double[] y, int incy, double[] a, int lda) {
   org.netlib.blas.Dger.dger(m, n, alpha, x, 0, incx, y, 0, incy, a, 0, lda);
  }

//  @Override
//  public void dger(int m, int n, double alpha, double[] x, int _x_offset, int incx, double[] y, int _y_offset, int incy, double[] a, int _a_offset, int lda) {
//   org.netlib.blas.Dger.dger(m, n, alpha, x, _x_offset, incx, y, _y_offset, incy, a, _a_offset, lda);
//  }

//  @Override
//  public double dnrm2(int n, double[] x, int incx) {
//    return org.netlib.blas.Dnrm2.dnrm2(n, x, 0, incx);
//  }

//  @Override
//  public double dnrm2(int n, double[] x, int _x_offset, int incx) {
//    return org.netlib.blas.Dnrm2.dnrm2(n, x, _x_offset, incx);
//  }

//  @Override
//  public void drot(int n, double[] dx, int incx, double[] dy, int incy, double c, double s) {
//   org.netlib.blas.Drot.drot(n, dx, 0, incx, dy, 0, incy, c, s);
//  }

//  @Override
//  public void drot(int n, double[] dx, int _dx_offset, int incx, double[] dy, int _dy_offset, int incy, double c, double s) {
//   org.netlib.blas.Drot.drot(n, dx, _dx_offset, incx, dy, _dy_offset, incy, c, s);
//  }

//  @Override
//  public void drotg(org.netlib.util.doubleW da, org.netlib.util.doubleW db, org.netlib.util.doubleW c, org.netlib.util.doubleW s) {
//   org.netlib.blas.Drotg.drotg(da, db, c, s);
//  }

//  @Override
//  public void drotm(int n, double[] dx, int incx, double[] dy, int incy, double[] dparam) {
//   org.netlib.blas.Drotm.drotm(n, dx, 0, incx, dy, 0, incy, dparam, 0);
//  }

//  @Override
//  public void drotm(int n, double[] dx, int _dx_offset, int incx, double[] dy, int _dy_offset, int incy, double[] dparam, int _dparam_offset) {
//   org.netlib.blas.Drotm.drotm(n, dx, _dx_offset, incx, dy, _dy_offset, incy, dparam, _dparam_offset);
//  }

//  @Override
//  public void drotmg(org.netlib.util.doubleW dd1, org.netlib.util.doubleW dd2, org.netlib.util.doubleW dx1, double dy1, double[] dparam) {
//   org.netlib.blas.Drotmg.drotmg(dd1, dd2, dx1, dy1, dparam, 0);
//  }

//  @Override
//  public void drotmg(org.netlib.util.doubleW dd1, org.netlib.util.doubleW dd2, org.netlib.util.doubleW dx1, double dy1, double[] dparam, int _dparam_offset) {
//   org.netlib.blas.Drotmg.drotmg(dd1, dd2, dx1, dy1, dparam, _dparam_offset);
//  }

  @Override
  public void dsbmv(java.lang.String uplo, int n, int k, double alpha, double[] a, int lda, double[] x, int incx, double beta, double[] y, int incy) {
   org.netlib.blas.Dsbmv.dsbmv(uplo, n, k, alpha, a, 0, lda, x, 0, incx, beta, y, 0, incy);
  }

//  @Override
//  public void dsbmv(java.lang.String uplo, int n, int k, double alpha, double[] a, int _a_offset, int lda, double[] x, int _x_offset, int incx, double beta, double[] y, int _y_offset, int incy) {
//   org.netlib.blas.Dsbmv.dsbmv(uplo, n, k, alpha, a, _a_offset, lda, x, _x_offset, incx, beta, y, _y_offset, incy);
//  }

//  @Override
//  public void dscal(int n, double da, double[] dx, int incx) {
//   org.netlib.blas.Dscal.dscal(n, da, dx, 0, incx);
//  }

//  @Override
//  public void dscal(int n, double da, double[] dx, int _dx_offset, int incx) {
//   org.netlib.blas.Dscal.dscal(n, da, dx, _dx_offset, incx);
//  }

  @Override
  public void dspmv(java.lang.String uplo, int n, double alpha, double[] ap, double[] x, int incx, double beta, double[] y, int incy) {
   org.netlib.blas.Dspmv.dspmv(uplo, n, alpha, ap, 0, x, 0, incx, beta, y, 0, incy);
  }

//  @Override
//  public void dspmv(java.lang.String uplo, int n, double alpha, double[] ap, int _ap_offset, double[] x, int _x_offset, int incx, double beta, double[] y, int _y_offset, int incy) {
//   org.netlib.blas.Dspmv.dspmv(uplo, n, alpha, ap, _ap_offset, x, _x_offset, incx, beta, y, _y_offset, incy);
//  }

  @Override
  public void dspr(java.lang.String uplo, int n, double alpha, double[] x, int incx, double[] ap) {
   org.netlib.blas.Dspr.dspr(uplo, n, alpha, x, 0, incx, ap, 0);
  }

//  @Override
//  public void dspr(java.lang.String uplo, int n, double alpha, double[] x, int _x_offset, int incx, double[] ap, int _ap_offset) {
//   org.netlib.blas.Dspr.dspr(uplo, n, alpha, x, _x_offset, incx, ap, _ap_offset);
//  }

  @Override
  public void dspr2(java.lang.String uplo, int n, double alpha, double[] x, int incx, double[] y, int incy, double[] ap) {
   org.netlib.blas.Dspr2.dspr2(uplo, n, alpha, x, 0, incx, y, 0, incy, ap, 0);
  }

//  @Override
//  public void dspr2(java.lang.String uplo, int n, double alpha, double[] x, int _x_offset, int incx, double[] y, int _y_offset, int incy, double[] ap, int _ap_offset) {
//   org.netlib.blas.Dspr2.dspr2(uplo, n, alpha, x, _x_offset, incx, y, _y_offset, incy, ap, _ap_offset);
//  }

//  @Override
//  public void dswap(int n, double[] dx, int incx, double[] dy, int incy) {
//   org.netlib.blas.Dswap.dswap(n, dx, 0, incx, dy, 0, incy);
//  }

//  @Override
//  public void dswap(int n, double[] dx, int _dx_offset, int incx, double[] dy, int _dy_offset, int incy) {
//   org.netlib.blas.Dswap.dswap(n, dx, _dx_offset, incx, dy, _dy_offset, incy);
//  }

  @Override
  public void dsymm(java.lang.String side, java.lang.String uplo, int m, int n, double alpha, double[] a, int lda, double[] b, int ldb, double beta, double[] c, int Ldc) {
   org.netlib.blas.Dsymm.dsymm(side, uplo, m, n, alpha, a, 0, lda, b, 0, ldb, beta, c, 0, Ldc);
  }

//  @Override
//  public void dsymm(java.lang.String side, java.lang.String uplo, int m, int n, double alpha, double[] a, int _a_offset, int lda, double[] b, int _b_offset, int ldb, double beta, double[] c, int _c_offset, int Ldc) {
//   org.netlib.blas.Dsymm.dsymm(side, uplo, m, n, alpha, a, _a_offset, lda, b, _b_offset, ldb, beta, c, _c_offset, Ldc);
//  }

  @Override
  public void dsymv(java.lang.String uplo, int n, double alpha, double[] a, int lda, double[] x, int incx, double beta, double[] y, int incy) {
   org.netlib.blas.Dsymv.dsymv(uplo, n, alpha, a, 0, lda, x, 0, incx, beta, y, 0, incy);
  }

//  @Override
//  public void dsymv(java.lang.String uplo, int n, double alpha, double[] a, int _a_offset, int lda, double[] x, int _x_offset, int incx, double beta, double[] y, int _y_offset, int incy) {
//   org.netlib.blas.Dsymv.dsymv(uplo, n, alpha, a, _a_offset, lda, x, _x_offset, incx, beta, y, _y_offset, incy);
//  }

  @Override
  public void dsyr(java.lang.String uplo, int n, double alpha, double[] x, int incx, double[] a, int lda) {
   org.netlib.blas.Dsyr.dsyr(uplo, n, alpha, x, 0, incx, a, 0, lda);
  }

//  @Override
//  public void dsyr(java.lang.String uplo, int n, double alpha, double[] x, int _x_offset, int incx, double[] a, int _a_offset, int lda) {
//   org.netlib.blas.Dsyr.dsyr(uplo, n, alpha, x, _x_offset, incx, a, _a_offset, lda);
//  }

  @Override
  public void dsyr2(java.lang.String uplo, int n, double alpha, double[] x, int incx, double[] y, int incy, double[] a, int lda) {
   org.netlib.blas.Dsyr2.dsyr2(uplo, n, alpha, x, 0, incx, y, 0, incy, a, 0, lda);
  }

//  @Override
//  public void dsyr2(java.lang.String uplo, int n, double alpha, double[] x, int _x_offset, int incx, double[] y, int _y_offset, int incy, double[] a, int _a_offset, int lda) {
//   org.netlib.blas.Dsyr2.dsyr2(uplo, n, alpha, x, _x_offset, incx, y, _y_offset, incy, a, _a_offset, lda);
//  }

  @Override
  public void dsyr2k(java.lang.String uplo, java.lang.String trans, int n, int k, double alpha, double[] a, int lda, double[] b, int ldb, double beta, double[] c, int Ldc) {
   org.netlib.blas.Dsyr2k.dsyr2k(uplo, trans, n, k, alpha, a, 0, lda, b, 0, ldb, beta, c, 0, Ldc);
  }

//  @Override
//  public void dsyr2k(java.lang.String uplo, java.lang.String trans, int n, int k, double alpha, double[] a, int _a_offset, int lda, double[] b, int _b_offset, int ldb, double beta, double[] c, int _c_offset, int Ldc) {
//   org.netlib.blas.Dsyr2k.dsyr2k(uplo, trans, n, k, alpha, a, _a_offset, lda, b, _b_offset, ldb, beta, c, _c_offset, Ldc);
//  }

  @Override
  public void dsyrk(java.lang.String uplo, java.lang.String trans, int n, int k, double alpha, double[] a, int lda, double beta, double[] c, int Ldc) {
   org.netlib.blas.Dsyrk.dsyrk(uplo, trans, n, k, alpha, a, 0, lda, beta, c, 0, Ldc);
  }

//  @Override
//  public void dsyrk(java.lang.String uplo, java.lang.String trans, int n, int k, double alpha, double[] a, int _a_offset, int lda, double beta, double[] c, int _c_offset, int Ldc) {
//   org.netlib.blas.Dsyrk.dsyrk(uplo, trans, n, k, alpha, a, _a_offset, lda, beta, c, _c_offset, Ldc);
//  }

  @Override
  public void dtbmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, int k, double[] a, int lda, double[] x, int incx) {
   org.netlib.blas.Dtbmv.dtbmv(uplo, trans, diag, n, k, a, 0, lda, x, 0, incx);
  }

//  @Override
//  public void dtbmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, int k, double[] a, int _a_offset, int lda, double[] x, int _x_offset, int incx) {
//   org.netlib.blas.Dtbmv.dtbmv(uplo, trans, diag, n, k, a, _a_offset, lda, x, _x_offset, incx);
//  }

//  @Override
//  public void dtbsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, int k, double[] a, int lda, double[] x, int incx) {
//   org.netlib.blas.Dtbsv.dtbsv(uplo, trans, diag, n, k, a, 0, lda, x, 0, incx);
//  }

//  @Override
//  public void dtbsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, int k, double[] a, int _a_offset, int lda, double[] x, int _x_offset, int incx) {
//   org.netlib.blas.Dtbsv.dtbsv(uplo, trans, diag, n, k, a, _a_offset, lda, x, _x_offset, incx);
//  }

  @Override
  public void dtpmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, double[] ap, double[] x, int incx) {
   org.netlib.blas.Dtpmv.dtpmv(uplo, trans, diag, n, ap, 0, x, 0, incx);
  }

//  @Override
//  public void dtpmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, double[] ap, int _ap_offset, double[] x, int _x_offset, int incx) {
//   org.netlib.blas.Dtpmv.dtpmv(uplo, trans, diag, n, ap, _ap_offset, x, _x_offset, incx);
//  }

//  @Override
//  public void dtpsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, double[] ap, double[] x, int incx) {
//   org.netlib.blas.Dtpsv.dtpsv(uplo, trans, diag, n, ap, 0, x, 0, incx);
//  }

//  @Override
//  public void dtpsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, double[] ap, int _ap_offset, double[] x, int _x_offset, int incx) {
//   org.netlib.blas.Dtpsv.dtpsv(uplo, trans, diag, n, ap, _ap_offset, x, _x_offset, incx);
//  }

  @Override
  public void dtrmm(java.lang.String side, java.lang.String uplo, java.lang.String transa, java.lang.String diag, int m, int n, double alpha, double[] a, int lda, double[] b, int ldb) {
   org.netlib.blas.Dtrmm.dtrmm(side, uplo, transa, diag, m, n, alpha, a, 0, lda, b, 0, ldb);
  }

//  @Override
//  public void dtrmm(java.lang.String side, java.lang.String uplo, java.lang.String transa, java.lang.String diag, int m, int n, double alpha, double[] a, int _a_offset, int lda, double[] b, int _b_offset, int ldb) {
//   org.netlib.blas.Dtrmm.dtrmm(side, uplo, transa, diag, m, n, alpha, a, _a_offset, lda, b, _b_offset, ldb);
//  }

  @Override
  public void dtrmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, double[] a, int lda, double[] x, int incx) {
   org.netlib.blas.Dtrmv.dtrmv(uplo, trans, diag, n, a, 0, lda, x, 0, incx);
  }

//  @Override
//  public void dtrmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, double[] a, int _a_offset, int lda, double[] x, int _x_offset, int incx) {
//   org.netlib.blas.Dtrmv.dtrmv(uplo, trans, diag, n, a, _a_offset, lda, x, _x_offset, incx);
//  }

//  @Override
//  public void dtrsm(java.lang.String side, java.lang.String uplo, java.lang.String transa, java.lang.String diag, int m, int n, double alpha, double[] a, int lda, double[] b, int ldb) {
//   org.netlib.blas.Dtrsm.dtrsm(side, uplo, transa, diag, m, n, alpha, a, 0, lda, b, 0, ldb);
//  }

//  @Override
//  public void dtrsm(java.lang.String side, java.lang.String uplo, java.lang.String transa, java.lang.String diag, int m, int n, double alpha, double[] a, int _a_offset, int lda, double[] b, int _b_offset, int ldb) {
//   org.netlib.blas.Dtrsm.dtrsm(side, uplo, transa, diag, m, n, alpha, a, _a_offset, lda, b, _b_offset, ldb);
//  }

//  @Override
//  public void dtrsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, double[] a, int lda, double[] x, int incx) {
//   org.netlib.blas.Dtrsv.dtrsv(uplo, trans, diag, n, a, 0, lda, x, 0, incx);
//  }

//  @Override
//  public void dtrsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, double[] a, int _a_offset, int lda, double[] x, int _x_offset, int incx) {
//   org.netlib.blas.Dtrsv.dtrsv(uplo, trans, diag, n, a, _a_offset, lda, x, _x_offset, incx);
//  }

//  @Override
//  public int idamax(int n, double[] dx, int incx) {
//    return org.netlib.blas.Idamax.idamax(n, dx, 0, incx);
//  }

//  @Override
//  public int idamax(int n, double[] dx, int _dx_offset, int incx) {
//    return org.netlib.blas.Idamax.idamax(n, dx, _dx_offset, incx);
//  }

//  @Override
//  public int isamax(int n, float[] sx, int incx) {
//    return org.netlib.blas.Isamax.isamax(n, sx, 0, incx);
//  }

//  @Override
//  public int isamax(int n, float[] sx, int _sx_offset, int incx) {
//    return org.netlib.blas.Isamax.isamax(n, sx, _sx_offset, incx);
//  }

//  @Override
//  public boolean lsame(java.lang.String ca, java.lang.String cb) {
//    return org.netlib.blas.Lsame.lsame(ca, cb);
//  }

//  @Override
//  public float sasum(int n, float[] sx, int incx) {
//    return org.netlib.blas.Sasum.sasum(n, sx, 0, incx);
//  }

//  @Override
//  public float sasum(int n, float[] sx, int _sx_offset, int incx) {
//    return org.netlib.blas.Sasum.sasum(n, sx, _sx_offset, incx);
//  }

//  @Override
//  public void saxpy(int n, float sa, float[] sx, int incx, float[] sy, int incy) {
//   org.netlib.blas.Saxpy.saxpy(n, sa, sx, 0, incx, sy, 0, incy);
//  }

//  @Override
//  public void saxpy(int n, float sa, float[] sx, int _sx_offset, int incx, float[] sy, int _sy_offset, int incy) {
//   org.netlib.blas.Saxpy.saxpy(n, sa, sx, _sx_offset, incx, sy, _sy_offset, incy);
//  }

//  @Override
//  public void scopy(int n, float[] sx, int incx, float[] sy, int incy) {
//   org.netlib.blas.Scopy.scopy(n, sx, 0, incx, sy, 0, incy);
//  }

//  @Override
//  public void scopy(int n, float[] sx, int _sx_offset, int incx, float[] sy, int _sy_offset, int incy) {
//   org.netlib.blas.Scopy.scopy(n, sx, _sx_offset, incx, sy, _sy_offset, incy);
//  }

//  @Override
//  public float sdot(int n, float[] sx, int incx, float[] sy, int incy) {
//    return org.netlib.blas.Sdot.sdot(n, sx, 0, incx, sy, 0, incy);
//  }

//  @Override
//  public float sdot(int n, float[] sx, int _sx_offset, int incx, float[] sy, int _sy_offset, int incy) {
//    return org.netlib.blas.Sdot.sdot(n, sx, _sx_offset, incx, sy, _sy_offset, incy);
//  }

//  @Override
//  public float sdsdot(int n, float sb, float[] sx, int incx, float[] sy, int incy) {
//    return org.netlib.blas.Sdsdot.sdsdot(n, sb, sx, 0, incx, sy, 0, incy);
//  }

//  @Override
//  public float sdsdot(int n, float sb, float[] sx, int _sx_offset, int incx, float[] sy, int _sy_offset, int incy) {
//    return org.netlib.blas.Sdsdot.sdsdot(n, sb, sx, _sx_offset, incx, sy, _sy_offset, incy);
//  }

//  @Override
//  public void sgbmv(java.lang.String trans, int m, int n, int kl, int ku, float alpha, float[] a, int lda, float[] x, int incx, float beta, float[] y, int incy) {
//   org.netlib.blas.Sgbmv.sgbmv(trans, m, n, kl, ku, alpha, a, 0, lda, x, 0, incx, beta, y, 0, incy);
//  }

//  @Override
//  public void sgbmv(java.lang.String trans, int m, int n, int kl, int ku, float alpha, float[] a, int _a_offset, int lda, float[] x, int _x_offset, int incx, float beta, float[] y, int _y_offset, int incy) {
//   org.netlib.blas.Sgbmv.sgbmv(trans, m, n, kl, ku, alpha, a, _a_offset, lda, x, _x_offset, incx, beta, y, _y_offset, incy);
//  }

//  @Override
//  public void sgemm(java.lang.String transa, java.lang.String transb, int m, int n, int k, float alpha, float[] a, int lda, float[] b, int ldb, float beta, float[] c, int Ldc) {
//   org.netlib.blas.Sgemm.sgemm(transa, transb, m, n, k, alpha, a, 0, lda, b, 0, ldb, beta, c, 0, Ldc);
//  }

//  @Override
//  public void sgemm(java.lang.String transa, java.lang.String transb, int m, int n, int k, float alpha, float[] a, int _a_offset, int lda, float[] b, int _b_offset, int ldb, float beta, float[] c, int _c_offset, int Ldc) {
//   org.netlib.blas.Sgemm.sgemm(transa, transb, m, n, k, alpha, a, _a_offset, lda, b, _b_offset, ldb, beta, c, _c_offset, Ldc);
//  }

//  @Override
//  public void sgemv(java.lang.String trans, int m, int n, float alpha, float[] a, int lda, float[] x, int incx, float beta, float[] y, int incy) {
//   org.netlib.blas.Sgemv.sgemv(trans, m, n, alpha, a, 0, lda, x, 0, incx, beta, y, 0, incy);
//  }

//  @Override
//  public void sgemv(java.lang.String trans, int m, int n, float alpha, float[] a, int _a_offset, int lda, float[] x, int _x_offset, int incx, float beta, float[] y, int _y_offset, int incy) {
//   org.netlib.blas.Sgemv.sgemv(trans, m, n, alpha, a, _a_offset, lda, x, _x_offset, incx, beta, y, _y_offset, incy);
//  }

//  @Override
//  public void sger(int m, int n, float alpha, float[] x, int incx, float[] y, int incy, float[] a, int lda) {
//   org.netlib.blas.Sger.sger(m, n, alpha, x, 0, incx, y, 0, incy, a, 0, lda);
//  }

//  @Override
//  public void sger(int m, int n, float alpha, float[] x, int _x_offset, int incx, float[] y, int _y_offset, int incy, float[] a, int _a_offset, int lda) {
//   org.netlib.blas.Sger.sger(m, n, alpha, x, _x_offset, incx, y, _y_offset, incy, a, _a_offset, lda);
//  }

//  @Override
//  public float snrm2(int n, float[] x, int incx) {
//    return org.netlib.blas.Snrm2.snrm2(n, x, 0, incx);
//  }

//  @Override
//  public float snrm2(int n, float[] x, int _x_offset, int incx) {
//    return org.netlib.blas.Snrm2.snrm2(n, x, _x_offset, incx);
//  }

//  @Override
//  public void srot(int n, float[] sx, int incx, float[] sy, int incy, float c, float s) {
//   org.netlib.blas.Srot.srot(n, sx, 0, incx, sy, 0, incy, c, s);
//  }

//  @Override
//  public void srot(int n, float[] sx, int _sx_offset, int incx, float[] sy, int _sy_offset, int incy, float c, float s) {
//   org.netlib.blas.Srot.srot(n, sx, _sx_offset, incx, sy, _sy_offset, incy, c, s);
//  }

//  @Override
//  public void srotg(org.netlib.util.floatW sa, org.netlib.util.floatW sb, org.netlib.util.floatW c, org.netlib.util.floatW s) {
//   org.netlib.blas.Srotg.srotg(sa, sb, c, s);
//  }

//  @Override
//  public void srotm(int n, float[] sx, int incx, float[] sy, int incy, float[] sparam) {
//   org.netlib.blas.Srotm.srotm(n, sx, 0, incx, sy, 0, incy, sparam, 0);
//  }

//  @Override
//  public void srotm(int n, float[] sx, int _sx_offset, int incx, float[] sy, int _sy_offset, int incy, float[] sparam, int _sparam_offset) {
//   org.netlib.blas.Srotm.srotm(n, sx, _sx_offset, incx, sy, _sy_offset, incy, sparam, _sparam_offset);
//  }

//  @Override
//  public void srotmg(org.netlib.util.floatW sd1, org.netlib.util.floatW sd2, org.netlib.util.floatW sx1, float sy1, float[] sparam) {
//   org.netlib.blas.Srotmg.srotmg(sd1, sd2, sx1, sy1, sparam, 0);
//  }

//  @Override
//  public void srotmg(org.netlib.util.floatW sd1, org.netlib.util.floatW sd2, org.netlib.util.floatW sx1, float sy1, float[] sparam, int _sparam_offset) {
//   org.netlib.blas.Srotmg.srotmg(sd1, sd2, sx1, sy1, sparam, _sparam_offset);
//  }

//  @Override
//  public void ssbmv(java.lang.String uplo, int n, int k, float alpha, float[] a, int lda, float[] x, int incx, float beta, float[] y, int incy) {
//   org.netlib.blas.Ssbmv.ssbmv(uplo, n, k, alpha, a, 0, lda, x, 0, incx, beta, y, 0, incy);
//  }

//  @Override
//  public void ssbmv(java.lang.String uplo, int n, int k, float alpha, float[] a, int _a_offset, int lda, float[] x, int _x_offset, int incx, float beta, float[] y, int _y_offset, int incy) {
//   org.netlib.blas.Ssbmv.ssbmv(uplo, n, k, alpha, a, _a_offset, lda, x, _x_offset, incx, beta, y, _y_offset, incy);
//  }

//  @Override
//  public void sscal(int n, float sa, float[] sx, int incx) {
//   org.netlib.blas.Sscal.sscal(n, sa, sx, 0, incx);
//  }

//  @Override
//  public void sscal(int n, float sa, float[] sx, int _sx_offset, int incx) {
//   org.netlib.blas.Sscal.sscal(n, sa, sx, _sx_offset, incx);
//  }

//  @Override
//  public void sspmv(java.lang.String uplo, int n, float alpha, float[] ap, float[] x, int incx, float beta, float[] y, int incy) {
//   org.netlib.blas.Sspmv.sspmv(uplo, n, alpha, ap, 0, x, 0, incx, beta, y, 0, incy);
//  }

//  @Override
//  public void sspmv(java.lang.String uplo, int n, float alpha, float[] ap, int _ap_offset, float[] x, int _x_offset, int incx, float beta, float[] y, int _y_offset, int incy) {
//   org.netlib.blas.Sspmv.sspmv(uplo, n, alpha, ap, _ap_offset, x, _x_offset, incx, beta, y, _y_offset, incy);
//  }

//  @Override
//  public void sspr(java.lang.String uplo, int n, float alpha, float[] x, int incx, float[] ap) {
//   org.netlib.blas.Sspr.sspr(uplo, n, alpha, x, 0, incx, ap, 0);
//  }

//  @Override
//  public void sspr(java.lang.String uplo, int n, float alpha, float[] x, int _x_offset, int incx, float[] ap, int _ap_offset) {
//   org.netlib.blas.Sspr.sspr(uplo, n, alpha, x, _x_offset, incx, ap, _ap_offset);
//  }

//  @Override
//  public void sspr2(java.lang.String uplo, int n, float alpha, float[] x, int incx, float[] y, int incy, float[] ap) {
//   org.netlib.blas.Sspr2.sspr2(uplo, n, alpha, x, 0, incx, y, 0, incy, ap, 0);
//  }

//  @Override
//  public void sspr2(java.lang.String uplo, int n, float alpha, float[] x, int _x_offset, int incx, float[] y, int _y_offset, int incy, float[] ap, int _ap_offset) {
//   org.netlib.blas.Sspr2.sspr2(uplo, n, alpha, x, _x_offset, incx, y, _y_offset, incy, ap, _ap_offset);
//  }

//  @Override
//  public void sswap(int n, float[] sx, int incx, float[] sy, int incy) {
//   org.netlib.blas.Sswap.sswap(n, sx, 0, incx, sy, 0, incy);
//  }

//  @Override
//  public void sswap(int n, float[] sx, int _sx_offset, int incx, float[] sy, int _sy_offset, int incy) {
//   org.netlib.blas.Sswap.sswap(n, sx, _sx_offset, incx, sy, _sy_offset, incy);
//  }

//  @Override
//  public void ssymm(java.lang.String side, java.lang.String uplo, int m, int n, float alpha, float[] a, int lda, float[] b, int ldb, float beta, float[] c, int Ldc) {
//   org.netlib.blas.Ssymm.ssymm(side, uplo, m, n, alpha, a, 0, lda, b, 0, ldb, beta, c, 0, Ldc);
//  }

//  @Override
//  public void ssymm(java.lang.String side, java.lang.String uplo, int m, int n, float alpha, float[] a, int _a_offset, int lda, float[] b, int _b_offset, int ldb, float beta, float[] c, int _c_offset, int Ldc) {
//   org.netlib.blas.Ssymm.ssymm(side, uplo, m, n, alpha, a, _a_offset, lda, b, _b_offset, ldb, beta, c, _c_offset, Ldc);
//  }

//  @Override
//  public void ssymv(java.lang.String uplo, int n, float alpha, float[] a, int lda, float[] x, int incx, float beta, float[] y, int incy) {
//   org.netlib.blas.Ssymv.ssymv(uplo, n, alpha, a, 0, lda, x, 0, incx, beta, y, 0, incy);
//  }

//  @Override
//  public void ssymv(java.lang.String uplo, int n, float alpha, float[] a, int _a_offset, int lda, float[] x, int _x_offset, int incx, float beta, float[] y, int _y_offset, int incy) {
//   org.netlib.blas.Ssymv.ssymv(uplo, n, alpha, a, _a_offset, lda, x, _x_offset, incx, beta, y, _y_offset, incy);
//  }

//  @Override
//  public void ssyr(java.lang.String uplo, int n, float alpha, float[] x, int incx, float[] a, int lda) {
//   org.netlib.blas.Ssyr.ssyr(uplo, n, alpha, x, 0, incx, a, 0, lda);
//  }

//  @Override
//  public void ssyr(java.lang.String uplo, int n, float alpha, float[] x, int _x_offset, int incx, float[] a, int _a_offset, int lda) {
//   org.netlib.blas.Ssyr.ssyr(uplo, n, alpha, x, _x_offset, incx, a, _a_offset, lda);
//  }

//  @Override
//  public void ssyr2(java.lang.String uplo, int n, float alpha, float[] x, int incx, float[] y, int incy, float[] a, int lda) {
//   org.netlib.blas.Ssyr2.ssyr2(uplo, n, alpha, x, 0, incx, y, 0, incy, a, 0, lda);
//  }

//  @Override
//  public void ssyr2(java.lang.String uplo, int n, float alpha, float[] x, int _x_offset, int incx, float[] y, int _y_offset, int incy, float[] a, int _a_offset, int lda) {
//   org.netlib.blas.Ssyr2.ssyr2(uplo, n, alpha, x, _x_offset, incx, y, _y_offset, incy, a, _a_offset, lda);
//  }

//  @Override
//  public void ssyr2k(java.lang.String uplo, java.lang.String trans, int n, int k, float alpha, float[] a, int lda, float[] b, int ldb, float beta, float[] c, int Ldc) {
//   org.netlib.blas.Ssyr2k.ssyr2k(uplo, trans, n, k, alpha, a, 0, lda, b, 0, ldb, beta, c, 0, Ldc);
//  }

//  @Override
//  public void ssyr2k(java.lang.String uplo, java.lang.String trans, int n, int k, float alpha, float[] a, int _a_offset, int lda, float[] b, int _b_offset, int ldb, float beta, float[] c, int _c_offset, int Ldc) {
//   org.netlib.blas.Ssyr2k.ssyr2k(uplo, trans, n, k, alpha, a, _a_offset, lda, b, _b_offset, ldb, beta, c, _c_offset, Ldc);
//  }

//  @Override
//  public void ssyrk(java.lang.String uplo, java.lang.String trans, int n, int k, float alpha, float[] a, int lda, float beta, float[] c, int Ldc) {
//   org.netlib.blas.Ssyrk.ssyrk(uplo, trans, n, k, alpha, a, 0, lda, beta, c, 0, Ldc);
//  }

//  @Override
//  public void ssyrk(java.lang.String uplo, java.lang.String trans, int n, int k, float alpha, float[] a, int _a_offset, int lda, float beta, float[] c, int _c_offset, int Ldc) {
//   org.netlib.blas.Ssyrk.ssyrk(uplo, trans, n, k, alpha, a, _a_offset, lda, beta, c, _c_offset, Ldc);
//  }

//  @Override
//  public void stbmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, int k, float[] a, int lda, float[] x, int incx) {
//   org.netlib.blas.Stbmv.stbmv(uplo, trans, diag, n, k, a, 0, lda, x, 0, incx);
//  }

//  @Override
//  public void stbmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, int k, float[] a, int _a_offset, int lda, float[] x, int _x_offset, int incx) {
//   org.netlib.blas.Stbmv.stbmv(uplo, trans, diag, n, k, a, _a_offset, lda, x, _x_offset, incx);
//  }

//  @Override
//  public void stbsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, int k, float[] a, int lda, float[] x, int incx) {
//   org.netlib.blas.Stbsv.stbsv(uplo, trans, diag, n, k, a, 0, lda, x, 0, incx);
//  }

//  @Override
//  public void stbsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, int k, float[] a, int _a_offset, int lda, float[] x, int _x_offset, int incx) {
//   org.netlib.blas.Stbsv.stbsv(uplo, trans, diag, n, k, a, _a_offset, lda, x, _x_offset, incx);
//  }

//  @Override
//  public void stpmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, float[] ap, float[] x, int incx) {
//   org.netlib.blas.Stpmv.stpmv(uplo, trans, diag, n, ap, 0, x, 0, incx);
//  }

//  @Override
//  public void stpmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, float[] ap, int _ap_offset, float[] x, int _x_offset, int incx) {
//   org.netlib.blas.Stpmv.stpmv(uplo, trans, diag, n, ap, _ap_offset, x, _x_offset, incx);
//  }

//  @Override
//  public void stpsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, float[] ap, float[] x, int incx) {
//   org.netlib.blas.Stpsv.stpsv(uplo, trans, diag, n, ap, 0, x, 0, incx);
//  }

//  @Override
//  public void stpsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, float[] ap, int _ap_offset, float[] x, int _x_offset, int incx) {
//   org.netlib.blas.Stpsv.stpsv(uplo, trans, diag, n, ap, _ap_offset, x, _x_offset, incx);
//  }

//  @Override
//  public void strmm(java.lang.String side, java.lang.String uplo, java.lang.String transa, java.lang.String diag, int m, int n, float alpha, float[] a, int lda, float[] b, int ldb) {
//   org.netlib.blas.Strmm.strmm(side, uplo, transa, diag, m, n, alpha, a, 0, lda, b, 0, ldb);
//  }

//  @Override
//  public void strmm(java.lang.String side, java.lang.String uplo, java.lang.String transa, java.lang.String diag, int m, int n, float alpha, float[] a, int _a_offset, int lda, float[] b, int _b_offset, int ldb) {
//   org.netlib.blas.Strmm.strmm(side, uplo, transa, diag, m, n, alpha, a, _a_offset, lda, b, _b_offset, ldb);
//  }

//  @Override
//  public void strmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, float[] a, int lda, float[] x, int incx) {
//   org.netlib.blas.Strmv.strmv(uplo, trans, diag, n, a, 0, lda, x, 0, incx);
//  }

//  @Override
//  public void strmv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, float[] a, int _a_offset, int lda, float[] x, int _x_offset, int incx) {
//   org.netlib.blas.Strmv.strmv(uplo, trans, diag, n, a, _a_offset, lda, x, _x_offset, incx);
//  }

//  @Override
//  public void strsm(java.lang.String side, java.lang.String uplo, java.lang.String transa, java.lang.String diag, int m, int n, float alpha, float[] a, int lda, float[] b, int ldb) {
//   org.netlib.blas.Strsm.strsm(side, uplo, transa, diag, m, n, alpha, a, 0, lda, b, 0, ldb);
//  }

//  @Override
//  public void strsm(java.lang.String side, java.lang.String uplo, java.lang.String transa, java.lang.String diag, int m, int n, float alpha, float[] a, int _a_offset, int lda, float[] b, int _b_offset, int ldb) {
//   org.netlib.blas.Strsm.strsm(side, uplo, transa, diag, m, n, alpha, a, _a_offset, lda, b, _b_offset, ldb);
//  }

//  @Override
//  public void strsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, float[] a, int lda, float[] x, int incx) {
//   org.netlib.blas.Strsv.strsv(uplo, trans, diag, n, a, 0, lda, x, 0, incx);
//  }

//  @Override
//  public void strsv(java.lang.String uplo, java.lang.String trans, java.lang.String diag, int n, float[] a, int _a_offset, int lda, float[] x, int _x_offset, int incx) {
//   org.netlib.blas.Strsv.strsv(uplo, trans, diag, n, a, _a_offset, lda, x, _x_offset, incx);
//  }
}
